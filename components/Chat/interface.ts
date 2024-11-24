export interface ChatMessage {
  content: string
  role: ChatRole
}

export interface Persona {
  id: string
  name: string
  description?: string
  avatar?: string
}

export interface Chat {
  id: string
  persona?: Persona
  title?: string
  messages?: ChatMessage[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Question {
  id: string;
  content: string;
  options: Option[];
}

export interface Option {
  id: string;
  content: string;
  score: number;
}

export interface ScaleResult {
  totalScore: number;
  analysis: string;
  level: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface Scale {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  getResult?: (answers: Map<string, string>, questions: Question[]) => ScaleResult;
}

export type ChatRole = 'assistant' | 'user' | 'system'

export { DefaultScales } from './scales'
