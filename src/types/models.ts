
export interface Contact {
  id: string;
  name: string;
  relationshipType: string;
  avatarColor: string;
  lastInteraction?: Date;
  sentimentScore?: number; // -1 to 1
  depthScore?: number; // 1 to 5
  insights?: Insight[];
  sessions?: Session[];
}

export interface Session {
  id: string;
  contactId: string;
  date: Date;
  phase: ConversationPhase;
  duration: number; // in seconds
  summary?: string;
  insights?: string[];
  sentimentScore?: number;
}

export interface Insight {
  id: string;
  contactId: string;
  category: InsightCategory;
  content: string;
  date: Date;
  source: "ai" | "user";
}

export interface Message {
  id: string;
  sessionId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  tags?: string[];
}

export type ConversationPhase = 
  | "onboarding" 
  | "emotionalMapping" 
  | "dynamicsTensions" 
  | "dualLensReflection"
  | "summary";

export type InsightCategory = 
  | "history" 
  | "emotionalTone" 
  | "rolesDynamics" 
  | "conflictChallenges" 
  | "perspectiveGap" 
  | "growthIntent";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  settings: UserSettings;
}

export interface UserSettings {
  notificationsEnabled: boolean;
  reminderFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
  voicePreferences: {
    speed: number; // 0.5 to 1.5
    pitch: number; // 0.5 to 1.5
  };
  theme: 'light' | 'dark' | 'system';
}
