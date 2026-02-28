/**
 * Bot Management Tools for SeductiveAI MCP Server
 */

import { MCPServer } from './server.js';
import type { Bot, CreateBotRequest, UpdateBotRequest } from '../types.js';
import { requestJson } from '../http.js';

/**
 * List all bots for the authenticated user
 */
export async function listBots(server: MCPServer): Promise<Bot[]> {
  return requestJson<Bot[]>(server, '/api/v1/bots');
}

/**
 * Get a specific bot by ID
 */
export async function getBot(server: MCPServer, botId: string): Promise<Bot> {
  return requestJson<Bot>(server, `/api/v1/bots/${botId}`);
}

/**
 * Create a new bot
 */
export async function createBot(
  server: MCPServer,
  request: CreateBotRequest
): Promise<{ bot_id: string; success: boolean }> {
  const result = await requestJson<{ instance_id?: string; id?: string }>(server, '/api/v1/bots', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  const botId = result.instance_id || result.id;
  if (!botId) {
    throw new Error('API response missing bot id');
  }

  return {
    bot_id: botId,
    success: true,
  };
}

/**
 * Update bot settings
 */
export async function updateBot(
  server: MCPServer,
  botId: string,
  request: UpdateBotRequest
): Promise<{ success: boolean }> {
  await requestJson<unknown>(server, `/api/v1/bots/${botId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
  return { success: true };
}

/**
 * Delete a bot
 */
export async function deleteBot(
  server: MCPServer,
  botId: string
): Promise<{ success: boolean }> {
  await requestJson<unknown>(server, `/api/v1/bots/${botId}`, {
    method: 'DELETE',
  });
  return { success: true };
}

/**
 * Start a bot
 */
export async function startBot(
  server: MCPServer,
  botId: string
): Promise<{ success: boolean }> {
  await requestJson<unknown>(server, `/api/v1/bots/${botId}/start`, {
    method: 'POST',
  });
  return { success: true };
}

/**
 * Stop a bot
 */
export async function stopBot(
  server: MCPServer,
  botId: string
): Promise<{ success: boolean }> {
  await requestJson<unknown>(server, `/api/v1/bots/${botId}/stop`, {
    method: 'POST',
  });
  return { success: true };
}

/**
 * Get bot status
 */
export async function getBotStatus(
  server: MCPServer,
  botId: string
): Promise<{ status: string; bot_id: string }> {
  return requestJson<{ status: string; bot_id: string }>(server, `/api/v1/bots/${botId}/status`);
}
