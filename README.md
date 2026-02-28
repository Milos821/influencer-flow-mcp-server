# Influencer Flow MCP Server

> Control your Influencer Flow bots via Claude Code, Cursor, VS Code, Windsurf, and other MCP-compatible IDEs using the Model Context Protocol (MCP)

## IDE & Client Compatibility

The Influencer Flow MCP Server works with any MCP-compatible client:

| Client | Support | Notes |
|--------|---------|-------|
| **Claude Code** | ✅ Full Support | Remote HTTP connection |
| **Cursor** | ✅ Full Support | Add to Settings → MCP |
| **VS Code (Cline)** | ✅ Full Support | Popular VS Code extension |
| **Windsurf** | ✅ Full Support | AI-powered IDE by Codeium |
| **OpenClaw** | ✅ Full Support | Open source AI agent |
| **Zed** | ✅ Full Support | High-performance editor |
| **Gemini CLI** | ✅ Full Support | Google's CLI tool |
| **Sourcegraph Cody** | ✅ Full Support | Enterprise-grade AI coding |
| **Any MCP Client** | ✅ Full Support | Works with all MCP-compliant tools |

## Features

- **Bot Management**: Create, list, update, delete, start, and stop bots
- **Widget Management**: Create widgets and get embed codes
- **Profile & Billing**: View your profile, credits, and billing info
- **Analytics**: Track credit usage, API calls, and costs
- **TypeScript**: Full type safety and autocompletion

## Requirements

- Node.js 18+
- Claude Code, Cursor, VS Code, Windsurf, OpenClaw (or any MCP-compatible client)
- Influencer Flow account with API access

## Quick Start

### Step 1: Get Your API Token

1. Log in to your [Influencer Flow Dashboard](https://dashboard.influencer-flow.com)
2. Go to **Settings** → **API Keys**
3. Click **Generate Token**
4. Copy your token (starts with `mcp_`)

### Step 2: Configure Your MCP Client

Add this to your project's `.mcp.json` file:

```json
{
  "mcpServers": {
    "influencer-flow": {
      "url": "https://influencer-flow.com/mcp",
      "env": {
        "INFLUENCER_FLOW_AUTH_TOKEN": "mcp_your_token_here"
      }
    }
  }
}
```

### Step 3: Restart Your IDE

Restart Claude Code or your IDE to load the new MCP server.

## Available Tools

### Bot Management

| Tool | Description |
|------|-------------|
| `list_bots` | List all your bots |
| `get_bot` | Get details of a specific bot |
| `create_bot` | Create a new bot |
| `update_bot` | Update bot settings |
| `delete_bot` | Delete a bot |
| `start_bot` | Start a bot |
| `stop_bot` | Stop a bot |
| `get_bot_status` | Get bot status |

### Widget Management

| Tool | Description |
|------|-------------|
| `list_widgets` | List all widgets for a bot |
| `create_widget` | Create a new widget |
| `get_widget_embed_code` | Get embed code for a widget |
| `get_widget_config` | Get widget configuration for bots |

### Profile & Billing

| Tool | Description |
|------|-------------|
| `get_profile` | Get user profile and credits |
| `get_credits` | Get credit balance |
| `get_billing` | Get billing information |
| `get_subscription` | Get Stripe subscription details |
| `list_invoices` | List Stripe invoices |

### Analytics & Usage

| Tool | Description |
|------|-------------|
| `get_analytics` | Get credit usage over time (daily stats, max 90 days) |
| `get_usage_stats` | Get usage statistics by type and model |
| `list_conversations` | List chat sessions/conversations |

## Usage Examples

### List all bots

```
User: Show me all my bots

Claude: (calls list_bots tool)
→ Returns list of all your bots with status
```

### Get credit balance

```
User: What's my credit balance?

Claude: (calls get_credits tool)
→ "You have 150 credits (100 subscription + 50 purchased)"
```

### Create a bot

```
User: Create a flirty bot named Luna in German

Claude: (calls create_bot tool)
→ Creates bot "Luna" with personality "flirty", language "de"
```

### Create a widget

```
User: Create a dark theme widget for bot abc123

Claude: (calls create_widget tool)
→ Creates widget with theme "dark", returns embed code
```

## Troubleshooting

**Connection Issues:**
- Verify your token is correct and not expired
- Check your internet connection
- Ensure the API URL is correct: `https://influencer-flow.com/mcp`

**Tools Not Showing:**
- Restart Claude Code completely
- Check that your `.mcp.json` is valid JSON
- Verify the token has MCP scope

**Authentication Errors:**
- Token may have expired - generate a new one in Settings → API Keys

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## License

MIT License

## Support

- Documentation: [docs.influencer-flow.com](https://docs.influencer-flow.com)
- Discord: [Join our community](https://discord.gg/influencerflow)
- Email: support@influencer-flow.com
