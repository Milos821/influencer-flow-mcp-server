# Influencer Flow MCP Server

Official MCP integration for Influencer Flow. Use it from Claude Code, Cursor, Cline, Windsurf, and any MCP-compatible client to manage AI Characters, Website Agents, Telegram onboarding, credits, and subscriptions.

Most customers do not need to install this repository. The standard path is:

1. Open Influencer Flow Dashboard -> Settings -> API
2. Copy the prebuilt MCP config for your client
3. Paste it into your client config and connect

## What this package does

- Exposes Influencer Flow operations as MCP tools.
- Authenticates requests with your personal MCP token.
- Supports direct remote MCP HTTP connection to `https://influencer-flow.com/mcp/`.
- Also supports a local stdio wrapper (`npx @milos821/influencer-flow-mcp-server`) for custom setups.

## Requirements

- Node.js 18+
- Influencer Flow account
- MCP token from Dashboard: `Settings -> API Keys`

## Authentication model

You must send:

`Authorization: Bearer <YOUR_MCP_TOKEN>`

## Quick Start

### Option A: Direct remote MCP (recommended)

Use the hosted endpoint directly in your MCP client:

`https://influencer-flow.com/mcp/`

### Option B: Local wrapper MCP server

```powershell
npx -y @milos821/influencer-flow-mcp-server
```

This local server reads:

- `INFLUENCER_FLOW_API_URL` (default: `https://influencer-flow.com`)
- `INFLUENCER_FLOW_AUTH_TOKEN` (required)

## Client configuration examples

### Claude Code (`.mcp.json`)

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

### Cursor (`~/.cursor/mcp.json`)

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

### Cline / Windsurf (remote server)

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

### OpenClaw

If your OpenClaw build supports MCP JSON configs, use the same remote HTTP config as above.

If your build is ACP-only, use OpenClaw ACP bridge mode (`openclaw acp`) and follow:
https://docs.openclaw.ai/cli/acp

### Any stdio-capable client (local wrapper)

```json
{
  "mcpServers": {
    "influencer-flow-local": {
      "command": "npx",
      "args": ["-y", "@milos821/influencer-flow-mcp-server"],
      "env": {
        "INFLUENCER_FLOW_API_URL": "https://influencer-flow.com",
        "INFLUENCER_FLOW_AUTH_TOKEN": "YOUR_MCP_TOKEN"
      }
    }
  }
}
```

## Available tools

### AI Character management

- `list_ai_characters`
- `get_ai_character`
- `create_ai_character`
- `update_ai_character`
- `delete_ai_character`
- `start_ai_character`
- `stop_ai_character`
- `get_ai_character_status`

### Website Agent management

- `list_website_agents`
- `create_website_agent`
- `get_website_agent_embed_code`

### Profile, credits, subscriptions, Telegram

- `get_profile`
- `get_credits`
- `get_billing`
- `get_subscription_plans`
- `send_telegram_code`
- `verify_telegram_code`

## Development

```powershell
npm install
npm run build
npm run dev
```

## Troubleshooting

- `401 Missing or invalid Authorization header`:
  - Add `headers.Authorization` in MCP client config.
  - Ensure value is exactly `Bearer <token>`.
- `401 Invalid or expired token`:
  - Regenerate token in Dashboard `Settings -> API Keys`.
- Server does not start:
  - Ensure Node 18+.
  - Run `npm run build` locally and fix reported errors.
- `Unexpected token '<', "<!doctype"...`:
  - You are hitting a website page instead of the MCP endpoint.
  - Use `/mcp/` endpoint URL in your config, not the root domain.

## License

MIT
