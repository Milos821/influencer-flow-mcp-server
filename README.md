# Influencer Flow MCP Server

Control your AI characters, website agents, and subscriptions directly from Claude Code, Cursor, Cline, or any MCP-compatible client.

## What is this?

The Influencer Flow MCP Server exposes your Influencer Flow account as a set of tools you can use in AI coding assistants. Build automated workflows, manage bots via chat, or integrate with your own tooling—no API calls required.

**What you can do:**
- Start and stop AI characters with chat commands
- Check credits and subscription status instantly
- Generate website agent embed codes
- Set up Telegram bot sessions programmatically

## Quick Start

### Option 1: Remote MCP (recommended)

Add this to your `.mcp.json`:

```json
{
  "mcpServers": {
    "influencer-flow": {
      "type": "http",
      "url": "https://influencer-flow.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_TOKEN"
      }
    }
  }
}
```

Get your token from **Dashboard → Settings → API Keys**.

### Option 2: Local CLI

```powershell
npx -y @milos821/influencer-flow-mcp-server
```

Set these environment variables:
- `INFLUENCER_FLOW_API_URL` — API base URL (default: `https://influencer-flow.com`)
- `INFLUENCER_FLOW_AUTH_TOKEN` — Your MCP token

## Available Tools

### AI Characters

| Tool | Description |
|------|-------------|
| `list_ai_characters` | List all your AI characters |
| `get_ai_character` | Get details for a specific character |
| `create_ai_character` | Create a new AI character |
| `update_ai_character` | Update character settings |
| `delete_ai_character` | Delete a character |
| `start_ai_character` | Start a running character |
| `stop_ai_character` | Stop a running character |
| `get_ai_character_status` | Check if a character is running |

### Website Agents

| Tool | Description |
|------|-------------|
| `list_website_agents` | List website agent configs |
| `create_website_agent` | Create a new website agent |
| `get_website_agent_embed_code` | Get the embed script for a website agent |

### Profile & Billing

| Tool | Description |
|------|-------------|
| `get_profile` | Get your account profile |
| `get_credits` | Check your credit balance |
| `get_billing` | Get subscription and invoice info |
| `get_subscription_plans` | List available subscription plans |

### Telegram

| Tool | Description |
|------|-------------|
| `send_telegram_code` | Send verification code to a phone number |
| `verify_telegram_code` | Verify code and create Telegram session |

## Client Configuration

### Claude Code

```json
{
  "mcpServers": {
    "influencer-flow": {
      "type": "http",
      "url": "https://influencer-flow.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

### Cursor

Same config as Claude Code. Add to `~/.cursor/mcp.json`.

### Cline / Windsurf

```json
{
  "mcpServers": {
    "influencer-flow": {
      "type": "http",
      "url": "https://influencer-flow.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

### Local stdio (any client)

```json
{
  "mcpServers": {
    "influencer-flow-local": {
      "command": "npx",
      "args": ["-y", "@milos821/influencer-flow-mcp-server"],
      "env": {
        "INFLUENCER_FLOW_API_URL": "https://influencer-flow.com",
        "INFLUENCER_FLOW_AUTH_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

## Requirements

- Node.js 18+
- Influencer Flow account
- MCP token (get from Dashboard → Settings → API Keys)

## Troubleshooting

**`401 Missing or invalid Authorization header`**
- Ensure `headers.Authorization` is set in your config
- Value must be exactly `Bearer <your_token>`

**`401 Invalid or expired token`**
- Regenerate your token in Dashboard → Settings → API Keys

**Server doesn't start**
- Verify Node 18+
- Run `npm run build` and check for errors

**`Unexpected token '<', "<!doctype"...`**
- You're hitting the website, not the MCP endpoint
- Use `/mcp/` path in your URL

## Development

```powershell
npm install
npm run build
npm run dev
```

## License

MIT
