/**
 * Widget Management Tools for SeductiveAI MCP Server
 */

import { MCPServer } from './server.js';
import type { Widget, CreateWidgetRequest, WidgetConfig } from './types.js';

/**
 * List all widgets for a bot
 */
export async function listWidgets(
  server: MCPServer,
  botId: string
): Promise<Widget[]> {
  const response = await fetch(`${server.baseUrl}/api/v1/widgets?bot_id=${botId}`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch widgets');
  }

  return response.json();
}

/**
 * Get a specific widget by ID
 */
export async function getWidget(
  server: MCPServer,
  widgetId: string
): Promise<Widget> {
  const response = await fetch(`${server.baseUrl}/api/v1/widgets/${widgetId}`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch widget');
  }

  return response.json();
}

/**
 * Create a new widget
 */
export async function createWidget(
  server: MCPServer,
  request: CreateWidgetRequest
): Promise<{ widget_id: string; embed_code: string; success: boolean }> {
  const response = await fetch(`${server.baseUrl}/api/v1/widgets`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create widget');
  }

  const result = await response.json();
  return {
    widget_id: result.widget_id || result.id,
    embed_code: result.embed_code || '',
    success: true
  };
}

/**
 * Get widget embed code
 */
export async function getWidgetEmbedCode(
  server: MCPServer,
  widgetId: string
): Promise<{ embed_code: string; widget_id: string }> {
  const response = await fetch(`${server.baseUrl}/api/v1/widgets/${widgetId}/embed`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch embed code');
  }

  return response.json();
}

/**
 * Update widget configuration
 */
export async function updateWidgetConfig(
  server: MCPServer,
  widgetId: string,
  config: WidgetConfig
): Promise<{ success: boolean }> {
  const response = await fetch(`${server.baseUrl}/api/v1/widgets/${widgetId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ config })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update widget');
  }

  return { success: true };
}

/**
 * Delete a widget
 */
export async function deleteWidget(
  server: MCPServer,
  widgetId: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${server.baseUrl}/api/v1/widgets/${widgetId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to delete widget');
  }

  return { success: true };
}
