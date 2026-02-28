/**
 * Widget Management Tools for SeductiveAI MCP Server
 */

import { MCPServer } from './server.js';
import type { Widget, CreateWidgetRequest, WidgetConfig } from '../types.js';
import { requestJson } from '../http.js';

/**
 * List all widgets for a bot
 */
export async function listWidgets(
  server: MCPServer,
  botId: string
): Promise<Widget[]> {
  return requestJson<Widget[]>(server, `/api/v1/widgets?bot_id=${botId}`);
}

/**
 * Get a specific widget by ID
 */
export async function getWidget(
  server: MCPServer,
  widgetId: string
): Promise<Widget> {
  return requestJson<Widget>(server, `/api/v1/widgets/${widgetId}`);
}

/**
 * Create a new widget
 */
export async function createWidget(
  server: MCPServer,
  request: CreateWidgetRequest
): Promise<{ widget_id: string; embed_code: string; success: boolean }> {
  const result = await requestJson<{ widget_id?: string; id?: string; embed_code?: string }>(server, '/api/v1/widgets', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  const widgetId = result.widget_id || result.id;
  if (!widgetId) {
    throw new Error('API response missing widget id');
  }

  return {
    widget_id: widgetId,
    embed_code: result.embed_code || '',
    success: true,
  };
}

/**
 * Get widget embed code
 */
export async function getWidgetEmbedCode(
  server: MCPServer,
  widgetId: string
): Promise<{ embed_code: string; widget_id: string }> {
  return requestJson<{ embed_code: string; widget_id: string }>(server, `/api/v1/widgets/${widgetId}/embed`);
}

/**
 * Update widget configuration
 */
export async function updateWidgetConfig(
  server: MCPServer,
  widgetId: string,
  config: WidgetConfig
): Promise<{ success: boolean }> {
  await requestJson<unknown>(server, `/api/v1/widgets/${widgetId}`, {
    method: 'PUT',
    body: JSON.stringify({ config }),
  });
  return { success: true };
}

/**
 * Delete a widget
 */
export async function deleteWidget(
  server: MCPServer,
  widgetId: string
): Promise<{ success: boolean }> {
  await requestJson<unknown>(server, `/api/v1/widgets/${widgetId}`, {
    method: 'DELETE',
  });
  return { success: true };
}
