/**
 * MCP Server - Main entry point for SeductiveAI MCP Server
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import * as botTools from './bots.js';
import * as widgetTools from './widgets.js';
import * as profileTools from './profile.js';

/**
 * MCPServer class - wraps server instance for tool access
 */
export class MCPServer {
  public baseUrl: string;
  public authToken: string;

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }
}

// ============================================
// TOOL SCHEMAS
// ============================================

const CreateBotSchema = z.object({
  name: z.string().min(1).max(50),
  personality: z.string().optional().default('flirty'),
  language: z.string().optional().default('en'),
  template: z.string().optional().default('adult'),
  system_prompt: z.string().optional(),
});

const UpdateBotSchema = z.object({
  bot_id: z.string(),
  system_prompt: z.string().optional(),
  voice_enabled: z.boolean().optional(),
  widget_enabled: z.boolean().optional(),
  personality: z.string().optional(),
  language: z.string().optional(),
});

const DeleteBotSchema = z.object({
  bot_id: z.string(),
});

const StartStopBotSchema = z.object({
  bot_id: z.string(),
});

const CreateWidgetSchema = z.object({
  bot_id: z.string(),
  type: z.enum(['chat', 'video', 'voice']).optional().default('chat'),
  theme: z.enum(['light', 'dark']).optional(),
  primary_color: z.string().optional(),
  position: z.enum(['bottom-right', 'bottom-left', 'top-right', 'top-left']).optional(),
  width: z.string().optional(),
  height: z.string().optional(),
});

const GetWidgetSchema = z.object({
  widget_id: z.string(),
});

const UpdateWidgetConfigSchema = z.object({
  widget_id: z.string(),
  theme: z.enum(['light', 'dark']).optional(),
  primary_color: z.string().optional(),
  position: z.enum(['bottom-right', 'bottom-left', 'top-right', 'top-left']).optional(),
  width: z.string().optional(),
  height: z.string().optional(),
});

// ============================================
// SERVER IMPLEMENTATION
// ============================================

export class InfluencerFlowMCPServer {
  private server: Server;
  private baseUrl: string;
  private authToken: string;

  constructor() {
    this.baseUrl = process.env.INFLUENCER_FLOW_API_URL || 'https://influencer-flow.com';
    this.authToken = process.env.INFLUENCER_FLOW_AUTH_TOKEN || '';

    if (!this.authToken) {
      console.error('ERROR: INFLUENCER_FLOW_AUTH_TOKEN environment variable is required');
      process.exit(1);
    }

    this.server = new Server(
      {
        name: 'influencer-flow-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupListToolsHandler();
  }

  private setupListToolsHandler() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          // Bot Tools
          {
            name: 'list_bots',
            description: 'List all bots for the authenticated user',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_bot',
            description: 'Get details for a specific bot',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
              },
              required: ['bot_id'],
            },
          },
          {
            name: 'create_bot',
            description: 'Create a new bot with the provided settings',
            inputSchema: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Bot name (1-50 characters)' },
                personality: { type: 'string', description: 'Personality: flirty, friendly, professional' },
                language: { type: 'string', description: 'Language: en, de, es, fr, etc.' },
                template: { type: 'string', description: 'Template: adult, general, support' },
                system_prompt: { type: 'string', description: 'Custom system prompt' },
              },
              required: ['name'],
            },
          },
          {
            name: 'update_bot',
            description: 'Update an existing bot',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
                system_prompt: { type: 'string', description: 'New system prompt' },
                voice_enabled: { type: 'boolean', description: 'Enable voice output' },
                widget_enabled: { type: 'boolean', description: 'Enable widget' },
                personality: { type: 'string', description: 'New personality' },
                language: { type: 'string', description: 'New language' },
              },
              required: ['bot_id'],
            },
          },
          {
            name: 'delete_bot',
            description: 'Delete a bot',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
              },
              required: ['bot_id'],
            },
          },
          {
            name: 'start_bot',
            description: 'Start a bot',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
              },
              required: ['bot_id'],
            },
          },
          {
            name: 'stop_bot',
            description: 'Stop a bot',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
              },
              required: ['bot_id'],
            },
          },
          {
            name: 'get_bot_status',
            description: 'Get the current bot status',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
              },
              required: ['bot_id'],
            },
          },

          // Widget Tools
          {
            name: 'list_widgets',
            description: 'List all widgets for a bot',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
              },
              required: ['bot_id'],
            },
          },
          {
            name: 'create_widget',
            description: 'Create a new widget for a bot',
            inputSchema: {
              type: 'object',
              properties: {
                bot_id: { type: 'string', description: 'Bot ID' },
                type: { type: 'string', enum: ['chat', 'video', 'voice'], description: 'Widget type' },
                theme: { type: 'string', enum: ['light', 'dark'], description: 'Theme' },
                primary_color: { type: 'string', description: 'Primary color (hex)' },
                position: { type: 'string', enum: ['bottom-right', 'bottom-left', 'top-right', 'top-left'], description: 'Widget position' },
                width: { type: 'string', description: 'Width (for example \"400px\")' },
                height: { type: 'string', description: 'Height (for example \"600px\")' },
              },
              required: ['bot_id'],
            },
          },
          {
            name: 'get_widget_embed_code',
            description: 'Get the embed code for a widget',
            inputSchema: {
              type: 'object',
              properties: {
                widget_id: { type: 'string', description: 'Widget ID' },
              },
              required: ['widget_id'],
            },
          },

          // Profile Tools
          {
            name: 'get_profile',
            description: 'Get user profile and credit balance',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_credits',
            description: 'Get credit balances',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_billing',
            description: 'Get billing information',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });
  }

  private setupToolHandlers() {
    const mcpServer = new MCPServer(this.baseUrl, this.authToken);

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          // Bot Tools
          case 'list_bots':
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.listBots(mcpServer), null, 2) }] };

          case 'get_bot':
            const getBotArgs = z.object({ bot_id: z.string() }).parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.getBot(mcpServer, getBotArgs.bot_id), null, 2) }] };

          case 'create_bot':
            const createBotArgs = CreateBotSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.createBot(mcpServer, createBotArgs), null, 2) }] };

          case 'update_bot':
            const updateBotArgs = UpdateBotSchema.parse(args);
            const { bot_id: ub_bot_id, ...updateData } = updateBotArgs;
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.updateBot(mcpServer, ub_bot_id, updateData), null, 2) }] };

          case 'delete_bot':
            const deleteBotArgs = DeleteBotSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.deleteBot(mcpServer, deleteBotArgs.bot_id), null, 2) }] };

          case 'start_bot':
            const startBotArgs = StartStopBotSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.startBot(mcpServer, startBotArgs.bot_id), null, 2) }] };

          case 'stop_bot':
            const stopBotArgs = StartStopBotSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.stopBot(mcpServer, stopBotArgs.bot_id), null, 2) }] };

          case 'get_bot_status':
            const statusArgs = z.object({ bot_id: z.string() }).parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await botTools.getBotStatus(mcpServer, statusArgs.bot_id), null, 2) }] };

          // Widget Tools
          case 'list_widgets':
            const listWidgetsArgs = z.object({ bot_id: z.string() }).parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await widgetTools.listWidgets(mcpServer, listWidgetsArgs.bot_id), null, 2) }] };

          case 'create_widget':
            const createWidgetArgs = CreateWidgetSchema.parse(args);
            const { bot_id: cw_bot_id, ...widgetConfig } = createWidgetArgs;
            return { content: [{ type: 'text', text: JSON.stringify(await widgetTools.createWidget(mcpServer, { bot_id: cw_bot_id, ...widgetConfig }), null, 2) }] };

          case 'get_widget_embed_code':
            const embedArgs = GetWidgetSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await widgetTools.getWidgetEmbedCode(mcpServer, embedArgs.widget_id), null, 2) }] };

          // Profile Tools
          case 'get_profile':
            return { content: [{ type: 'text', text: JSON.stringify(await profileTools.getProfile(mcpServer), null, 2) }] };

          case 'get_credits':
            return { content: [{ type: 'text', text: JSON.stringify(await profileTools.getCredits(mcpServer), null, 2) }] };

          case 'get_billing':
            return { content: [{ type: 'text', text: JSON.stringify(await profileTools.getBilling(mcpServer), null, 2) }] };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('SeductiveAI MCP Server started');
  }
}

// ============================================
// MAIN ENTRY POINT
// ============================================

export async function startServer(): Promise<void> {
  const server = new InfluencerFlowMCPServer();
  await server.start();
}
