# QA Test Failure Monitor — n8n Setup Guide

## Prerequisites

1. n8n instance running at myn8n.ramondebruyn.com
2. LambdaTest account with API access
3. Anthropic API key
4. Jira (Atlassian) API token
5. GitHub fine-grained PAT (scoped to ramonthedom/LambdaCypress)
6. Slack Incoming Webhook URL

## Step 1: Create Credentials in n8n

### LambdaTest Basic Auth
- **Type:** HTTP Basic Auth
- **Name:** `LambdaTest Basic Auth`
- **Username:** `ramonstarlightmusic`
- **Password:** (LT_ACCESS_KEY from .env)

### Anthropic API Key
- **Type:** HTTP Header Auth
- **Name:** `Anthropic API Key`
- **Header Name:** `x-api-key`
- **Header Value:** your Anthropic API key

### Jira Basic Auth
- **Type:** HTTP Basic Auth
- **Name:** `Jira Basic Auth`
- **Username:** `ramon@starlightmusic.com`
- **Password:** your Atlassian API token
- **Note:** Set the credential's extra field `jiraHost` = `starlightmusic.atlassian.net`

### GitHub PAT
- **Type:** HTTP Header Auth
- **Name:** `GitHub PAT`
- **Header Name:** `Authorization`
- **Header Value:** `Bearer ghp_YOUR_TOKEN_HERE`
- **Scope:** Fine-grained, repository access to `ramonthedom/LambdaCypress` only
- **Permissions needed:** Contents (read/write), Pull requests (read/write)

### Slack Webhook
- **Type:** HTTP Header Auth (or just use the URL directly)
- **Name:** `Slack Webhook`
- **Set extra field** `slackWebhookUrl` = your Slack incoming webhook URL
- **Alternative:** Replace `{{ $credentials.slackWebhookUrl }}` in the Slack nodes with a hardcoded URL

## Step 2: Import Workflow

1. Open n8n at myn8n.ramondebruyn.com
2. Go to Workflows > Import from File
3. Select `qa-failure-monitor.workflow.json`
4. Update credential references in each node to match your created credentials

## Step 3: Adjust Credential References

After import, click each HTTP Request node and re-select the correct credential from the dropdown. The JSON references credential IDs that won't match your n8n instance.

Nodes that need credential assignment:
- **Fetch Failed Builds** → LambdaTest Basic Auth
- **Fetch Failed Sessions** → LambdaTest Basic Auth
- **Fetch Command Logs** → LambdaTest Basic Auth
- **Fetch Console Logs** → LambdaTest Basic Auth
- **Fetch Network Logs** → LambdaTest Basic Auth
- **Fetch Test Source** → GitHub PAT
- **Jira Dedup Search** → Jira Basic Auth
- **Claude API Diagnosis** → Anthropic API Key
- **Add Jira Comment** → Jira Basic Auth
- **Create Jira Ticket** → Jira Basic Auth
- **Get Main Branch SHA** → GitHub PAT
- **Create Branch** → GitHub PAT
- **Get Current File** → GitHub PAT
- **Push Fix** → GitHub PAT
- **Create Draft PR** → GitHub PAT
- **Slack Alert** → Slack Webhook URL
- **Error Alert to Ramon** → Slack Webhook URL

## Step 4: Test Manually

1. In n8n, click "Execute Workflow" to run manually
2. If no recent failed builds exist, temporarily lower the dedup check by clearing static data
3. Verify each node executes correctly step-by-step

## Step 5: Activate

1. Toggle the workflow to "Active"
2. It will now poll every 30 minutes
3. Disable the built-in LambdaTest Slack integration to avoid duplicate alerts

## Workflow Flow

```
Schedule (30 min)
  → Fetch failed builds from LambdaTest API
  → Dedup (skip already-processed builds)
  → Fetch failed sessions per build
  → Fetch logs (command + console + network) in parallel
  → Merge logs with session metadata
  → Check Jira for existing ticket + Fetch test source from GitHub (parallel)
  → Send to Claude API for diagnosis
  → Parse diagnosis response
  → Fork into 3 outputs:
    1. Jira: Create ticket OR add comment to existing
    2. GitHub: Create draft PR (only if confidence >= 0.8 AND is_test_bug)
    3. Slack: Send Block Kit alert with action buttons
```

## Notes on the GitHub File Path

The "Get Current File" node searches for the spec file under a specific directory structure. If your spec files move or the path pattern changes, update the URL in that node. Current expected path:

```
cypress/integration/starlight/starlightQATests/{folder}/{spec_file}
```

The workflow extracts the spec file name from the LambdaTest session name. If LambdaTest reports the full path, the Flatten Sessions code node may need adjustment to parse it correctly.

## Troubleshooting

- **No builds found:** Check LT credentials, verify builds exist at app.lambdatest.com
- **Dedup blocks everything:** Clear static data in the Dedup Builds node settings
- **Claude parse error:** Check the diagnosis node output — Claude may return markdown-wrapped JSON
- **Jira 401:** Verify API token is valid, email matches, project key is SPRO
- **GitHub 404:** Verify PAT has correct repo scope and file path is accurate
