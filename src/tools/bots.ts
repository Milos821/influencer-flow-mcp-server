/**
 * Bot Management Tools for SeductiveAI MCP Server
 */

import { MCPServer } from './server.js';
import type { Bot, CreateBotRequest, UpdateBotRequest } from './types.js';

/**
 * List all bots for the authenticated user
 */
export async function listBots(server: MCPServer): Promise<Bot[]> {
  const response = await fetch(`${server.baseUrl}/api/v1/bots`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch bots');
  }

  return response.json();
}

/**
 * Get a specific bot by ID
 */
export async function getBot(server: MCPServer, botId: string): Promise<Bot> {
  const response = await fetch(`${server.baseUrl}/api/v1/bots/${botId}`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch bot');
  }

  return response.json();
}

/**
 * Create a new bot
 */
export async function createBot(
  server: MCPServer,
  request: CreateBotRequest
): Promise<{ bot_id: string; success: boolean }> {
  const response = await fetch(`${server.baseUrl}/api/v1/bots`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create bot');
  }

  const result = await response.json();
  return {
    bot_id: result.instance_id || result.id,
    success: true
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
  const response = await fetch(`${server.baseUrl}/api/v1/bots/${botId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update bot');
  }

  return { success: true };
}

/**
 * Delete a bot
 */
export async function deleteBot(
  server: MCPServer,
  botId: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${server.baseUrl}/api/v1/bots/${botId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to delete bot');
  }

  return { success: true };
}

/**
 * Start a bot
 */
export async function startBot(
  server: MCPServer,
  botId: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${server.baseUrl}/api/v1/bots/${botId}/start`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to start bot');
  }

  return { success: true };
}

/**
 * Stop a bot
 */
export async function stopBot(
  server: MCPServer,
  botId: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${server.baseUrl}/api/v1/bots/${botId}/stop`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to stop bot');
  }

  return { success: true };
}

/**
 * Get bot status
 */
export async function getBotStatus(
  server: MCPServer,
  botId: string
): Promise<{ status: string; bot_id: string }> {
  const response = await fetch(`${server.baseUrl}/api/v1/bots/${botId}/status`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch bot status');
  }

  return response.json();
}
