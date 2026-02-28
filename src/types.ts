/**
 * SeductiveAI MCP Server - TypeScript Types
 */

// ============================================
// BOT TYPES
// ============================================

export interface Bot {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  personality: string;
  language: string;
  template: string;
  voice_enabled: boolean;
  widget_enabled: boolean;
  system_prompt?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBotRequest {
  name: string;
  personality?: string;
  language?: string;
  template?: string;
  system_prompt?: string;
}

export interface UpdateBotRequest {
  system_prompt?: string;
  voice_enabled?: boolean;
  widget_enabled?: boolean;
  personality?: string;
  language?: string;
}

// ============================================
// WIDGET TYPES
// ============================================

export interface Widget {
  id: string;
  bot_id: string;
  type: 'chat' | 'video' | 'voice';
  config: WidgetConfig;
  embed_code: string;
  created_at: string;
}

export interface WidgetConfig {
  theme?: 'light' | 'dark';
  primary_color?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  width?: string;
  height?: string;
}

export interface CreateWidgetRequest {
  bot_id: string;
  type?: 'chat' | 'video' | 'voice';
  config?: WidgetConfig;
}

// ============================================
// USER TYPES
// ============================================

export interface UserProfile {
  email: string;
  customer_id: string;
  username?: string;
  credits: number;
  subscription?: SubscriptionInfo;
}

export interface SubscriptionInfo {
  plan: string;
  status: 'active' | 'inactive' | 'past_due';
  expires_at?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface MCPSettings {
  telegram_api_id?: string;
  telegram_api_hash?: string;
  openai_api_key?: string;
  replicate_api_key?: string;
}

export interface AuthTokenResponse {
  token: string;
  expires_at: string;
}

export interface APIError {
  error: string;
  code?: string;
}
