/**
 * Profile & Credits Tools for SeductiveAI MCP Server
 */

import { MCPServer } from './server.js';
import type { UserProfile, SubscriptionInfo } from '../types.js';
import { requestJson } from '../http.js';

/**
 * Get user profile
 */
export async function getProfile(server: MCPServer): Promise<UserProfile> {
  const data = await requestJson<{
    email: string;
    customer_id: string;
    username?: string;
    credits?: number;
    subscription?: SubscriptionInfo;
  }>(server, '/api/v1/users/me');

  return {
    email: data.email,
    customer_id: data.customer_id,
    username: data.username,
    credits: data.credits || 0,
    subscription: data.subscription,
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
  return requestJson<{
    credits: number;
    subscription_credits: number;
    purchased_credits: number;
    total: number;
  }>(server, '/api/v1/credits');
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
  return requestJson<{
    subscription?: SubscriptionInfo;
    invoices: Array<{
      id: string;
      amount: number;
      status: string;
      created_at: string;
    }>;
  }>(server, '/api/v1/subscriptions');
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
  return requestJson<Array<{
    id: string;
    name: string;
    price: number;
    credits: number;
    features: string[];
  }>>(server, '/api/v1/subscriptions/plans');
}
