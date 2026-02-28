# Influencer Flow MCP Server

> Control your Influencer Flow bots via Claude Code, Cursor, VS Code, Windsurf, und andere MCP-kompatible IDEs mit dem Model Context Protocol (MCP)

## IDE Kompatibilität

| IDE | Support |
|-----|---------|
| **Claude Code** | ✅ Vollständig unterstützt |
| **Cursor** | ✅ Vollständig unterstützt |
| **VS Code (mit Copilot)** | ✅ Vollständig unterstützt |
| **Windsurf** | ✅ Vollständig unterstützt |
| **Andere MCP-Clients** | ✅ Funktioniert mit jedem MCP-kompatiblen Client |

## Features

- **Bot Management**: Create, list, update, delete, start, and stop bots
- **Widget Management**: Create widgets and get embed codes
- **Profile & Billing**: View your profile, credits, and billing info
- **TypeScript**: Full type safety and autocompletion

## Requirements

- Node.js 18+
- Claude Code (or any MCP-compatible client)
- Influencer Flow account with API access

## Installation

### Option 1: Direktverbindung (EMPFOHLEN) ⚡

Der einfachste Weg - verbinde dich direkt mit dem Influencer Flow Server:

1. Generiere einen Token in deinem Dashboard unter **Settings → API Keys**
2. Füge dies zu deiner `.mcp.json` hinzu:

```json
{
  "mcpServers": {
    "influencer-flow": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sse", "--url", "https://api.influencer-flow.com/mcp"],
      "env": {
        "INFLUENCER_FLOW_AUTH_TOKEN": "DEIN_TOKEN"
      }
    }
  }
}
```

### Option 2: Lokal hosten (Fortgeschritten)

Für Fortgeschrittene die ihren eigenen Server betreiben wollen:

```bash
# Repository klonen
git clone https://github.com/Milos821/influencer-flow-mcp-server.git
cd influencer-flow-mcp-server

# Dependencies installieren
npm install

# Bauen
npm run build

# Starten
npm start
```

## Configuration

### 1. Get your Auth Token

1. Log in to your [Influencer Flow Dashboard](https://influencer-flow.com)
2. Go to **Settings** → **API Keys**
3. Click **Generate Token**
4. Copy your authentication token

### 2. Configure Environment

Create a `.env` file:

```bash
INFLUENCER_FLOW_API_URL=https://api.influencer-flow.com
INFLUENCER_FLOW_AUTH_TOKEN=your_token_here
```

Or set environment variables:

```bash
export INFLUENCER_FLOW_API_URL=https://api.influencer-flow.com
export INFLUENCER_FLOW_AUTH_TOKEN=your_token_here
```

### 3. Add to Claude Code

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "influencer-flow": {
      "command": "npx",
      "args": ["-y", "@milos821/influencer-flow-mcp-server"],
      "env": {
        "INFLUENCER_FLOW_API_URL": "https://api.influencer-flow.com",
        "INFLUENCER_FLOW_AUTH_TOKEN": "your_token_here"
      }
    }
  }
}
```

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

### Profile & Billing

| Tool | Description |
|------|-------------|
| `get_profile` | Get user profile and credits |
| `get_credits` | Get credit balance |
| `get_billing` | Get billing information |

## Usage Examples

### Create a new bot

```
User: Create a flirty bot named Luna in German

Claude: (calls create_bot tool)
→ Creates bot "Luna" with personality "flirty", language "de"
```

### List all bots

```
User: Show me all my bots

Claude: (calls list_bots tool)
→ Returns list of all your bots
```

### Get credit balance

```
User: What's my credit balance?

Claude: (calls get_credits tool)
→ "You have 150 credits (100 subscription + 50 purchased)"
```

### Create a widget

```
User: Create a dark theme widget for bot abc123

Claude: (calls create_widget tool)
→ Creates widget with theme "dark", returns embed code
```

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
