export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  animated?: boolean;
  liked?: boolean;
  saved?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: Date;
  messages: Message[];
}
