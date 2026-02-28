import type { MCPServer } from './tools/server.js';

interface ApiErrorPayload {
  detail?: string;
  error?: string;
  message?: string;
}

function parseErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const errorPayload = payload as ApiErrorPayload;
  return errorPayload.detail || errorPayload.error || errorPayload.message || fallback;
}

export async function requestJson<T>(
  server: MCPServer,
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${server.baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${server.authToken}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  const rawBody = await response.text();
  let payload: unknown = null;

  if (rawBody) {
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = { message: rawBody };
    }
  }

  if (!response.ok) {
    throw new Error(parseErrorMessage(payload, `Request failed: ${response.status}`));
  }

  return payload as T;
}
