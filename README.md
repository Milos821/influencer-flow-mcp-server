# Influencer Flow MCP Server

Official MCP integration for Influencer Flow. Use it from Claude Code, Cursor, Cline, Windsurf, and any MCP-compatible client to manage bots, widgets, analytics, credits, and billing.

## What this package does

- Exposes Influencer Flow operations as MCP tools.
- Authenticates requests with your personal MCP token.
- Works as a local stdio MCP server (`npx @milos821/influencer-flow-mcp-server`).
- Can also be used with direct remote MCP HTTP connection to `https://influencer-flow.com/mcp/`.

## Requirements

- Node.js 18+
- Influencer Flow account
- MCP token from Dashboard: `Settings -> API Keys`

## Authentication model

You must send:

`Authorization: Bearer <YOUR_MCP_TOKEN>`

Do not put the token only in `env` when using remote `url` servers. For remote MCP HTTP, clients must send the token as an HTTP header.

## Quick Start

### Option A: Direct remote MCP (recommended)

Use the hosted endpoint directly:

`https://influencer-flow.com/mcp/`

### Option B: Local wrapper MCP server

```powershell
npx -y @milos821/influencer-flow-mcp-server
```

This local server reads:

- `INFLUENCER_FLOW_API_URL` (default: `https://api.influencer-flow.com`)
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
      "url": "https://influencer-flow.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_TOKEN"
      }
    }
  }
}
```

### Any stdio-capable client (local wrapper)

```json
{
  "mcpServers": {
    "influencer-flow-local": {
      "command": "npx",
      "args": ["-y", "@milos821/influencer-flow-mcp-server"],
      "env": {
        "INFLUENCER_FLOW_API_URL": "https://api.influencer-flow.com",
        "INFLUENCER_FLOW_AUTH_TOKEN": "YOUR_MCP_TOKEN"
      }
    }
  }
}
```

## Available tools

### Bot management

- `list_bots`
- `get_bot`
- `create_bot`
- `update_bot`
- `delete_bot`
- `start_bot`
- `stop_bot`
- `get_bot_status`

### Widget management

- `list_widgets`
- `create_widget`
- `get_widget_embed_code`

### Profile and billing

- `get_profile`
- `get_credits`
- `get_billing`

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

## License

MIT
