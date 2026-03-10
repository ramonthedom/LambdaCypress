# Weekly Contact Us Form E2E QA Test (Production)

## Context

The Contact Us form on starlightmusic.com is a critical lead generation pathway. If the form breaks — submission fails, email doesn't reach Evan (etyler@starlightmusic.com), SMS doesn't fire — potential clients are lost silently. This workflow creates a **weekly production smoke test** that exercises the full pipeline end-to-end: real browser form fill on the live site → backend processing → email delivery (SendGrid) → SMS delivery (Twilio) → human confirmation from Evan.

**This runs on production.** The test submits real data through the real website to verify the real pipeline works.

---

## Architecture: n8n + LambdaTest/Cypress (Hybrid)

**LambdaTest/Cypress** — Real browser fills out & submits the Contact Us form on starlightmusic.com
**n8n** — Orchestration: scheduling, CloudWatch verification (email + SMS), human-in-the-loop with Evan, failure handling, data cleanup

```
┌─ n8n Workflow (Friday 9am ET) ───────────────────────────────────────────┐
│                                                                           │
│  1. Trigger LambdaTest build → Cypress fills & submits form on prod      │
│  2. Poll for completion (up to 10 min)                                   │
│  3. Wait 3 min for email/SMS pipeline                                    │
│  4. Query CloudWatch /ecs/data-hub-service → email dispatched?           │
│  5. Query CloudWatch /ecs/starbridge-sms-service → SMS sent?            │
│     ├─ ANY FAILED → Claude diagnosis → Jira + Slack alert               │
│     └─ ALL PASSED →                                                      │
│  6. Email Evan (etyler@starlightmusic.com): "Did you get it?"           │
│  7. Wait for Evan's Yes/No click (webhook)                               │
│     ├─ YES → Clean up test data → Slack success                         │
│     ├─ NO  → Claude diagnosis → Jira → Slack alert                     │
│     ├─ 2h no response → Re-send email to Evan                           │
│     └─ 4h no response → Jira ticket + Slack alert                       │
│  8. Delete test Event/Client from production DB (cleanup)                │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Backend — reCAPTCHA Bypass (Production-Safe)

The form requires Google reCAPTCHA v3 (score > 0.5), which blocks automated browsers. We need a bypass that works on production but is extremely secure.

**File:** `slight/starlight-event-service/lib/controllers/getInTouchController.js` (~lines 43-54)

```javascript
// Insert BEFORE the existing reCAPTCHA verification block:
const bypassToken = req.headers['x-qa-bypass-token'];
const isTestBypass = bypassToken
  && process.env.QA_BYPASS_TOKEN
  && bypassToken === process.env.QA_BYPASS_TOKEN;

if (isTestBypass) {
  isCaptchaTrue = true;
  console.log('[QA-BYPASS] reCAPTCHA skipped for authorized test submission');
} else {
  // ... existing reCAPTCHA verification code unchanged ...
}
```

**Production safety controls:**
- `QA_BYPASS_TOKEN` is a 64-character cryptographically random string, stored as an ECS environment variable
- The token is only known to the Cypress test environment (via GitHub Actions secrets) and n8n
- The token is rotatable — change it in ECS + GitHub Secrets + n8n if compromised
- The bypass is logged (`[QA-BYPASS]` prefix) so any unauthorized use is visible in CloudWatch
- No `NODE_ENV` gate — the token itself IS the gate. Without the exact 64-char token, reCAPTCHA runs normally.

**Deploy:** Add `QA_BYPASS_TOKEN` to production ECS task definition for starlight-event-service. Deploy via `prod` branch.

**Repo:** Bitbucket `starcodepro/starlight-event-service` (`prod` branch)

---

## Phase 2: Cypress Spec — Full UI Form Fill & Submit on Production

**File:** `CypressLambdaTests/Cypress-Cloud/cypress/integration/starlight/starlightQATests/1_starlightTests/1.10_contactUsFormE2ETest.spec.js`

Real browser-based form interaction on starlightmusic.com, simulating an actual customer.

### Test 1: Page Load & Form Field Verification
- `cy.visit('https://www.starlightmusic.com/contact-us')`
- Assert page title, form container, all required field inputs, and submit button render correctly

### Test 2: Fill & Submit Contact Form via Real Browser
1. **Fill all fields as a real user would:**
   - First Name: type `"QATest"`
   - Last Name: type `"WeeklyCheck"`
   - Phone: type `"(555) 867-5309"`
   - Email: type `"qa-weekly@starlightmusic.com"` (or a real monitored email)
   - Event Date: type a date 60+ days out into the Ant DatePicker
   - Venue: type `"The Plaza Hotel, New York, NY"` (recognizable, real venue)
   - Event Type: click dropdown, select first option (e.g., Wedding)
   - How did you hear: select "Other"
   - Contact Reason: select "Pricing and Availability"
   - Message: type `"QA_WEEKLY_TEST_[unix_timestamp] - This is an automated weekly QA test. Please ignore this submission."`

2. **Intercept the form POST to inject bypass header:**
   ```javascript
   cy.intercept('POST', '**/getInTouch', (req) => {
     req.headers['x-qa-bypass-token'] = Cypress.env('QA_BYPASS_TOKEN');
   }).as('formSubmit');
   ```
   This lets the form fill happen naturally (testing real UX) while Cypress silently injects the bypass header on the outgoing API call so reCAPTCHA doesn't block submission.

3. **Click submit:** `cy.get('.contact-us-submit-btn').click()`

4. **Assert success:**
   - `cy.wait('@formSubmit').its('response.statusCode').should('eq', 200)`
   - Assert redirect to `/contact-us/thank-you` OR success element `.cnt_success_subheading > span` exists

**Reference selectors:** The existing test at `slight/starlight-nextjs/cypress/e2e/0-custom-tests/1_contact_us_test.js` has working selectors for all form fields.

**LambdaTest config:** `CypressLambdaTests/Cypress-Cloud/lambdatest-config-contact-us.json` — dedicated config targeting only this spec, build name `contact-us-e2e-weekly`.

---

## Phase 3: n8n Workflow (~30 nodes)

**File:** `CypressLambdaTests/Cypress-Cloud/n8n/contact-us-e2e-workflow.json`

### A. Schedule + Trigger (4 nodes)
1. **Schedule Trigger** — CRON `0 9 * * 5` (Friday 9am ET)
2. **Trigger LambdaTest Build** — GitHub Actions workflow dispatch (`POST /repos/ramonthedom/LambdaCypress/actions/workflows/contact-us-e2e.yml/dispatches`). The GHA workflow runs `npx lambdatest-cypress run --cf lambdatest-config-contact-us.json`.
3. **Poll for Completion** — Code node polling LambdaTest `GET /automation/api/v1/builds?build_name=contact-us-e2e-weekly-{date}` every 30s, up to 10 min
4. **Extract Build Results** — Parse pass/fail, build_id, session_id

### B. Verify Email + SMS via CloudWatch (3 nodes)
5. **Wait 3 Minutes** — Allow email/SMS pipeline to process
6. **Check Email (CloudWatch)** — Logs Insights query on `/ecs/data-hub-service`:
   ```
   fields @timestamp, @message
   | filter @message like /Sending email/
   | filter @message like /qa-weekly@starlightmusic.com/ or @message like /QATest/
   | sort @timestamp desc
   | limit 5
   ```
7. **Check SMS (CloudWatch)** — Logs Insights query on `/ecs/starbridge-sms-service`:
   ```
   fields @timestamp, @message
   | filter @message like /Message sent/ or @message like /send.*sms/i
   | filter @timestamp > ago(10m)
   | sort @timestamp desc
   | limit 5
   ```

### C. Consolidate + Branch (2 nodes)
8. **Consolidate Results** — Merge Cypress/CloudWatch email/CloudWatch SMS into pass/fail
9. **Automated Checks Passed?** — IF node: all green?

### D. Human-in-the-Loop: Evan (6 nodes) — TRUE branch
10. **Generate Webhook URLs** — YES/NO callback URLs
11. **Send Evan Email** — To etyler@starlightmusic.com. HTML email:
    - "Hi Evan, our weekly QA test submitted a Contact Us form at {time}. Test name: QATest WeeklyCheck. Did you receive the system notification email?"
    - Green YES button / Red NO button (link to n8n webhooks)
12. **Wait 2 Hours** — Webhook wait node
13. **Response or Timeout?** — Switch:
    - **YES** → Success path
    - **NO** → Failure path
    - **2h timeout** → Re-send
14. **Re-send Email to Evan** — Same email, then wait 2 more hours
    - **Response** → Route to YES/NO
    - **4h total timeout** → Failure path

### E. Failure Path (4 nodes)
15. **Classify Failure** — `cypress_failed` / `email_not_dispatched` / `sms_not_sent` / `evan_denied` / `evan_timeout`
16. **Claude API Investigation** — `claude-sonnet-4-20250514` with failure context + architecture details. Returns root_cause, severity, affected_service, recommended_fix
17. **Create Jira Ticket** — SPRO project, Bug type, High priority, labels: `qa-auto`, `contact-us-e2e`, assigned to Emmanuel
18. **Slack Failure Alert** — Red Block Kit message, @Ramon @Emmanuel, Claude diagnosis, buttons to LT/Jira

### F. Success Path (1 node)
19. **Slack Success** — Green notification: "Contact Us E2E PASSED - Friday {date}"

### G. Cleanup — Always Runs (2 nodes)
20. **Delete Test Event** — Query production MongoDB for Event where lead firstName = "QATest" created today, delete it
21. **Delete Test Client** — Delete Client where email = "qa-weekly@starlightmusic.com"

**Cleanup approach:** Preferred method is to have `getInTouchController.js` return `eventId` and `clientId` in the API response when the bypass header is present. Cypress captures these, and n8n uses them for precise deletion. Fallback: n8n queries MongoDB directly by test data fields + today's date.

---

## Phase 4: GitHub Actions Workflow

**File:** `.github/workflows/contact-us-e2e.yml` in `ramonthedom/LambdaCypress`

```yaml
name: Contact Us E2E Test
on:
  workflow_dispatch:
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npx lambdatest-cypress run --cf lambdatest-config-contact-us.json
        env:
          LT_USERNAME: ${{ secrets.LT_USERNAME }}
          LT_ACCESS_KEY: ${{ secrets.LT_ACCESS_KEY }}
          QA_BYPASS_TOKEN: ${{ secrets.QA_BYPASS_TOKEN }}
```

n8n triggers via: `POST https://api.github.com/repos/ramonthedom/LambdaCypress/actions/workflows/contact-us-e2e.yml/dispatches`

---

## CloudWatch Log Groups (Production — Confirmed)

| Log Group | Retention | Use |
|-----------|-----------|-----|
| `/ecs/data-hub-service` | Unlimited (815MB) | Primary: email dispatch verification |
| `/ecs/starlight-event-service` | 3 days | Form submission processing |
| `/ecs/starbridge-mail-service` | 3 days | SendGrid delivery (may be empty) |
| `/ecs/starbridge-sms-service` | 3 days | SMS dispatch verification |

---

## n8n Configuration

**Required env var change (self-hosted v2.2.4):**
Set `EXECUTIONS_TIMEOUT=-1` (or `900` for 15 min) in your n8n Docker/environment config. The default 300s (5 min) timeout will kill the LambdaTest polling loop. The Evan wait uses n8n's Wait node which pauses execution to DB and doesn't count against the timeout.

## Credentials Needed in n8n

| Credential | Type | For |
|------------|------|-----|
| GitHub PAT | Bearer token | Trigger GHA workflow dispatch |
| LambdaTest | Basic Auth | Poll build status |
| AWS | Access Key/Secret | CloudWatch Logs Insights queries (email + SMS) |
| Anthropic | API Key | Claude diagnosis on failure |
| Jira | Basic Auth | Ticket creation (SPRO project) |
| Slack | Webhook URL | Success/failure notifications |
| SMTP or SendGrid | Email sender | Evan's confirmation email |
| MongoDB | Connection string | Test data cleanup (prod DB) |

---

## Test Data & Cleanup

- **Test data:** `firstName: "QATest"`, `lastName: "WeeklyCheck"`, `email: "qa-weekly@starlightmusic.com"`, `message: "QA_WEEKLY_TEST_[timestamp]"`
- **Cleanup runs ALWAYS** (pass or fail) — deletes the test Event and Client from production MongoDB so they never appear in Starbridge Leads
- **Best approach:** `getInTouchController.js` returns `eventId`/`clientId` in bypass-mode response → Cypress captures → n8n deletes by ID
- **Fallback:** n8n queries MongoDB for `lead.firstName: "QATest"` + `lead.email: "qa-weekly@starlightmusic.com"` created today

---

## Implementation Order

| Step | Task | Location |
|------|------|----------|
| 1 | Generate 64-char `QA_BYPASS_TOKEN` | Local (openssl rand -hex 32) |
| 2 | Add `QA_BYPASS_TOKEN` to prod ECS env vars | AWS ECS console |
| 3 | Add reCAPTCHA bypass + return IDs in bypass response | Bitbucket: starlight-event-service (prod) |
| 4 | Deploy starlight-event-service to production | ECS |
| 5 | Test bypass with curl against production | Terminal |
| 6 | Write Cypress spec `1.10_contactUsFormE2ETest.spec.js` | GitHub: LambdaCypress |
| 7 | Write `lambdatest-config-contact-us.json` | GitHub: LambdaCypress |
| 8 | Add `QA_BYPASS_TOKEN` to GitHub repo secrets | GitHub: LambdaCypress settings |
| 9 | Write GHA workflow `contact-us-e2e.yml` | GitHub: LambdaCypress |
| 10 | Run Cypress spec on LambdaTest manually, verify pass | LambdaTest dashboard |
| 11 | Add all credentials to n8n | myn8n.ramondebruyn.com |
| 12 | Build + import n8n workflow | myn8n.ramondebruyn.com |
| 13 | Manual end-to-end test of full workflow | n8n |
| 14 | Verify cleanup (test data removed from prod DB) | MongoDB / Starbridge Leads page |
| 15 | Activate Friday schedule | n8n |
| 16 | Write setup documentation | GitHub: LambdaCypress |

---

## Verification Checklist

1. **curl test** — `POST /getInTouch` with bypass header on prod → 200 + response includes eventId/clientId
2. **Cypress on LambdaTest** — Real browser fills form on starlightmusic.com, submits, lands on thank-you page
3. **CloudWatch email** — Query `/ecs/data-hub-service` → email dispatch log for "qa-weekly@starlightmusic.com"
4. **CloudWatch SMS** — Query `/ecs/starbridge-sms-service` → SMS dispatch log exists
5. **Evan's system email** — Evan receives the actual "Customer Reach Out" notification from the system
6. **Evan's confirmation email** — Evan receives the n8n human-in-the-loop email with YES/NO buttons
7. **YES path** — Click YES → Slack success → test data cleaned from prod DB → no lead in Starbridge
8. **NO path** — Click NO → Claude diagnosis → Jira ticket → Slack @Ramon @Emmanuel
9. **Timeout** — No click → re-send at 2h → Jira at 4h
10. **Cleanup** — Event/Client records gone from production MongoDB

---

## Key Files

| File | Purpose |
|------|---------|
| `slight/starlight-event-service/lib/controllers/getInTouchController.js` | Add reCAPTCHA bypass + return IDs |
| `slight/starlight-nextjs/components/ContactUsComponent/index.js` | Form field IDs + selectors reference |
| `slight/starlight-nextjs/cypress/e2e/0-custom-tests/1_contact_us_test.js` | Existing test with working CSS selectors |
| `CypressLambdaTests/Cypress-Cloud/lambdatest-config.json` | Existing LT config template |
| `CypressLambdaTests/Cypress-Cloud/n8n/qa-failure-monitor.workflow.json` | Existing n8n workflow (reuse node patterns) |
