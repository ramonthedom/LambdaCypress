# Contact Us E2E — Setup & Deployment Guide

Step-by-step guide to configure and deploy the weekly Contact Us form E2E test.
All 5 implementation files are already written. This guide covers placeholder configuration, secrets, deployment, and verification.

---

## Implementation Files (Already Written)

| # | File | Status |
|---|------|--------|
| 1 | `cypress/integration/starlight/starlightQATests/1_starlightTests/1.10_contactUsFormE2ETest.spec.js` | Ready |
| 2 | `lambdatest-config-contact-us.json` | Ready |
| 3 | `.github/workflows/contact-us-e2e.yml` | Ready |
| 4 | `n8n/contact-us-e2e-workflow.json` | Has 4 placeholders |
| 5 | `slight/starlight-event-service` bypass code | Not yet applied (manual) |

---

## Step 1: Generate QA_BYPASS_TOKEN

```bash
openssl rand -hex 32
```

This produces a 64-character hex string. **Save this value** — you'll need it in 3 places:
- ECS task definition env var (starlight-event-service)
- GitHub Actions secret (LambdaCypress repo)
- n8n (if needed for future direct API calls)

---

## Step 2: Placeholders to Replace in n8n Workflow

The file `n8n/contact-us-e2e-workflow.json` contains 4 placeholder strings that must be replaced before importing into n8n.

### 2A. `REPLACE_WITH_N8N_WEBHOOK_BASE_URL`
**Node:** "Generate Webhook URLs" (line ~272)
**What it is:** Your n8n instance's externally-reachable base URL.
**Example value:** `https://myn8n.ramondebruyn.com`
**Used for:** Building the YES/NO callback URLs that Evan clicks in his email.

### 2B. `REPLACE_WITH_SMTP_OR_SENDGRID_ENDPOINT`
**Nodes:** "Email Evan: Did You Get It?" (line ~283) and "Re-send Email (2h timeout)" (line ~365)
**What it is:** An HTTP endpoint that sends email. Options:
- **SendGrid API:** `https://api.sendgrid.com/v3/mail/send` (with API key auth)
- **n8n SMTP node:** Replace the HTTP Request node entirely with n8n's built-in Send Email node
- **Custom SMTP relay endpoint**

**Recommendation:** The simplest approach is to replace these two HTTP Request nodes with n8n's built-in "Send Email" node after import, wiring them to your SMTP credentials in n8n. No placeholder needed.

### 2C. `REPLACE_WITH_YOUR_SLACK_WEBHOOK_URL`
**Nodes:** "Slack Success" (line ~514) and "Slack Failure Alert" (line ~498)
**What it is:** Slack Incoming Webhook URL for your QA notifications channel.
**Example value:** `https://hooks.slack.com/services/TXXXXX/BXXXXX/your-token-here`
**Setup:** Slack App > Incoming Webhooks > Add to channel (e.g., `#qa-alerts`)

### 2D. `REPLACE_WITH_MONGODB_API_OR_INTERNAL_ENDPOINT/cleanup`
**Node:** "Delete Test Event/Client" (line ~540)
**What it is:** An endpoint that accepts DELETE requests to remove test data from production MongoDB.
**Options:**
- Internal cleanup API endpoint on one of the services
- Direct MongoDB connection via n8n's MongoDB node (replace the HTTP Request node)
- AWS Lambda function that connects to prod MongoDB

**Recommendation:** After import, replace this HTTP Request node with two n8n MongoDB nodes — one to delete the test Event, one to delete the test Client. Use the queries from "Prepare Cleanup Queries":
```json
Event: { "lead.firstName": "QATest", "lead.lastName": "WeeklyCheck" }
Client: { "email": "qa-weekly@starlightmusic.com" }
```

---

## Step 3: n8n Credentials to Create

Create these credentials in n8n (Settings > Credentials) **before** importing the workflow:

| Credential Name | Type | ID in Workflow | Details |
|-----------------|------|----------------|---------|
| GitHub PAT | Header Auth | `github-pat` | Header: `Authorization`, Value: `Bearer ghp_...` |
| LambdaTest Basic Auth | Basic Auth | `lt-basic-auth` | Username: `ramonstarlightmusic`, Password: LT access key |
| AWS CloudWatch | Basic Auth | `aws-credentials` | Access Key ID + Secret (needs `logs:StartQuery`, `logs:GetQueryResults` on `/ecs/data-hub-service` and `/ecs/starbridge-sms-service`) |
| Anthropic API Key | Header Auth | `anthropic-api-key` | Header: `x-api-key`, Value: `sk-ant-...` |
| Jira Basic Auth | Basic Auth | `jira-basic-auth` | Email: your Jira email, Password: Jira API token |

**Note:** After importing, n8n will prompt you to re-map credentials. Match the names above to your created credentials.

---

## Step 4: Backend Deployment (starlight-event-service)

### 4A. Add reCAPTCHA Bypass Code
In `slight/starlight-event-service/lib/controllers/getInTouchController.js`, add the bypass block **before** the existing reCAPTCHA verification (see `weekly-contact-us-e2e-qa-plan.md` Phase 1 for exact code).

### 4B. Add ECS Environment Variable
In AWS ECS console:
1. Go to Task Definitions > starlight-event-service
2. Create new revision
3. Add environment variable: `QA_BYPASS_TOKEN` = (the 64-char hex from Step 1)
4. Update the production service to use the new task definition

### 4C. Deploy
Push the bypass code to `prod` branch on Bitbucket (`starcodepro/starlight-event-service`). Deploy via your normal ECS deployment process.

### 4D. Verify Bypass Works
```bash
curl -X POST https://api.starlightmusic.com/getInTouch \
  -H "Content-Type: application/json" \
  -H "x-qa-bypass-token: YOUR_64_CHAR_TOKEN_HERE" \
  -d '{
    "firstName": "CurlTest",
    "lastName": "BypassVerify",
    "email": "curltest@example.com",
    "phone": "5558675309",
    "eventDate": "2026-06-01",
    "venue": "Test Venue",
    "eventType": "Wedding",
    "hearAboutUs": "Other",
    "contactReason": "Pricing and Availability",
    "message": "CURL_BYPASS_TEST - Delete this record"
  }'
```
**Expected:** 200 response. Check CloudWatch `/ecs/starlight-event-service` for `[QA-BYPASS]` log.
**Cleanup:** Delete the CurlTest record from prod MongoDB after verifying.

---

## Step 5: Push LambdaCypress Changes

```bash
cd CypressLambdaTests/Cypress-Cloud
git add cypress/integration/starlight/starlightQATests/1_starlightTests/1.10_contactUsFormE2ETest.spec.js
git add lambdatest-config-contact-us.json
git add .github/workflows/contact-us-e2e.yml
git commit -m "Add Contact Us E2E weekly test spec, LT config, and GHA workflow"
git push origin main
```

---

## Step 6: GitHub Secrets

In GitHub > `ramonthedom/LambdaCypress` > Settings > Secrets and variables > Actions:

| Secret Name | Value |
|-------------|-------|
| `QA_BYPASS_TOKEN` | The 64-char hex from Step 1 |
| `LT_USERNAME` | `ramonstarlightmusic` (if not already set) |
| `LT_ACCESS_KEY` | Your LambdaTest access key (if not already set) |

---

## Step 7: Manual LambdaTest Run

Before setting up n8n, verify the Cypress spec passes on LambdaTest:

1. Go to GitHub > `ramonthedom/LambdaCypress` > Actions > "Contact Us E2E Test"
2. Click "Run workflow" > Run
3. Monitor on LambdaTest dashboard — build name: `contact-us-e2e-weekly`
4. Both tests should pass:
   - "Contact Us page loads correctly with all form fields"
   - "Fill and submit Contact Us form"

---

## Step 8: Import n8n Workflow

1. Replace all 4 placeholders in `n8n/contact-us-e2e-workflow.json` (Step 2 above)
2. Go to `myn8n.ramondebruyn.com` > Workflows > Import from file
3. Upload `contact-us-e2e-workflow.json`
4. Re-map all credentials when prompted
5. **Optionally** replace HTTP Request email/MongoDB nodes with native n8n nodes (recommended)

---

## Step 9: Set n8n Execution Timeout

Your self-hosted n8n v2.2.4 has a default 5-minute execution timeout. The LambdaTest polling loop needs ~10 minutes.

In your n8n Docker environment (or `.env`):
```
EXECUTIONS_TIMEOUT=-1
```
Or for a 15-minute cap:
```
EXECUTIONS_TIMEOUT=900
```

Restart n8n after changing this.

**Note:** The Evan wait nodes use n8n's "Wait" node which pauses to DB — they don't count against the execution timeout.

---

## Step 10: Full End-to-End Test

1. In n8n, open the "Contact Us E2E Weekly Test" workflow
2. Click "Execute Workflow" (manual trigger)
3. Monitor each node's execution:
   - GitHub Actions triggered?
   - LambdaTest build starts and polls?
   - Cypress passes?
   - CloudWatch queries succeed?
   - Evan's email arrives?
   - Click YES in Evan's email
   - Slack success notification posts?
   - Test data cleaned from MongoDB?
4. Verify in Starbridge that no "QATest WeeklyCheck" lead appears

---

## Step 11: Activate Schedule

Once the manual run succeeds:
1. Toggle the workflow to Active in n8n
2. The Schedule Trigger fires every Friday at 9am ET

---

## Troubleshooting

| Issue | Check |
|-------|-------|
| Cypress fails to submit form | Verify `QA_BYPASS_TOKEN` matches in ECS env var and GitHub secret |
| CloudWatch queries fail | Check AWS credentials have `logs:StartQuery` + `logs:GetQueryResults` permissions |
| Evan's email not received | Check SMTP/SendGrid configuration in n8n; verify `etyler@starlightmusic.com` isn't filtering |
| n8n workflow times out | Confirm `EXECUTIONS_TIMEOUT` is set and n8n was restarted |
| LambdaTest build not found | Check build name matches `contact-us-e2e-weekly` in both LT config and poll code |
| Webhook YES/NO links broken | Verify n8n webhook base URL is externally reachable (no firewall/CORS issues) |
| MongoDB cleanup fails | Replace HTTP Request node with native MongoDB node; verify connection string |

---

## Security Checklist

- [ ] `QA_BYPASS_TOKEN` is 64 chars, generated via `openssl rand -hex 32`
- [ ] Token is stored as ECS env var (not hardcoded in code)
- [ ] Token is in GitHub Secrets (not in committed files)
- [ ] Bypass is logged with `[QA-BYPASS]` prefix for audit trail
- [ ] No `NODE_ENV` gate — token IS the gate
- [ ] Test data cleanup runs on every execution (pass or fail)
- [ ] Slack alerts tag @ramon and @emmanuel on failure
