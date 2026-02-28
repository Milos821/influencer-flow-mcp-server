/**
 * Profile & Credits Tools for SeductiveAI MCP Server
 */

import { MCPServer } from './server.js';
import type { UserProfile, SubscriptionInfo } from './types.js';

/**
 * Get user profile
 */
export async function getProfile(server: MCPServer): Promise<UserProfile> {
  const response = await fetch(`${server.baseUrl}/api/v1/users/me`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch profile');
  }

  const data = await response.json();
  return {
    email: data.email,
    customer_id: data.customer_id,
    username: data.username,
    credits: data.credits || 0,
    subscription: data.subscription
  };
}

/**
 * Get credit balance
 */
export async function getCredits(server: MCPServer): Promise<{
  credits: number;
  subscription_credits: number;
  purchased_credits: number;
  total: number;
}> {
  const response = await fetch(`${server.baseUrl}/api/v1/credits`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch credits');
  }

  return response.json();
}

/**
 * Get billing information
 */
export async function getBilling(server: MCPServer): Promise<{
  subscription?: SubscriptionInfo;
  invoices: Array<{
    id: string;
    amount: number;
    status: string;
    created_at: string;
  }>;
}> {
  const response = await fetch(`${server.baseUrl}/api/v1/subscriptions`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch billing info');
  }

  return response.json();
}

/**
 * Get subscription plans
 */
export async function getSubscriptionPlans(server: MCPServer): Promise<Array<{
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
}>> {
  const response = await fetch(`${server.baseUrl}/api/v1/subscriptions/plans`, {
    headers: {
      'Authorization': `Bearer ${server.authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch plans');
  }

  return response.json();
}
