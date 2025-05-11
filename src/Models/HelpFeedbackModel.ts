
import { Timestamp } from 'firebase/firestore';

/**
 * Representa um tipo de problema selecionável.
 */
export interface ProblemType {
  id: number;
  label: string;
  icon: string;
}

/**
 * Representa uma FAQ.
 */
export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

/**
 * Representa um feedback enviado pelo usuário.
 */
export interface Feedback {
  id?: string;
  userId: string;
  problemType: ProblemType;
  details: string;
  createdAt: Timestamp;
  attachmentUrl?: string;
  rating?: number;
}
