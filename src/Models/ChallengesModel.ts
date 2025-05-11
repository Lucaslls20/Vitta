import { db } from '../Services/firebaseConfig';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Interface definitions for recipes and challenges
 */
export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  healthScore?: number;
  readyInMinutes?: number;
  summary: string;
  servings?: number;
  nutrition?: {
    nutrients: Array<{ name: string; amount: number; unit: string }>;
  };
}

export type ChallengeStatus = 'pending' | 'active' | 'completed' | 'overdue';
export type ChallengeDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: ChallengeDifficulty;
  daysToComplete: number;
  currentDay?: number;
  progress: number;
  status: ChallengeStatus;
  icon?: string;
  reward?: string;
  participants?: number;
  recipeId?: number;
  recipeImage?: string;
  nutritionFocus?: string;
}

/**
 * Service class handling Firebase operations for challenges
 */
export class ChallengeModel {
  private static collectionRef = collection(db, 'challenges');

  /**
   * User joins a challenge: writes initial entry to Firestore
   */
  static async joinChallenge(challenge: Challenge, userId: string): Promise<void> {
    const userChallengeRef = doc(this.collectionRef, `${userId}_${challenge.id}`);
    await setDoc(userChallengeRef, {
      ...challenge,
      userId,
      status: 'active',
      currentDay: 0,
      progress: 0,
      joinedAt: new Date().toISOString(),
    });
  }

  /**
   * Stub: track progress (to be implemented)
   */
  static async trackProgress(challengeId: string, userId: string, progress: number): Promise<void> {
    // TODO: Implement progress update logic
    const userChallengeRef = doc(this.collectionRef, `${userId}_${challengeId}`);
    await updateDoc(userChallengeRef, { progress, updatedAt: new Date().toISOString() });
  }

  /**
   * Stub: view results (to be implemented)
   */
  static viewResults(challengeId: string, userId: string): void {
    // TODO: Navigate or fetch results
    console.log(`Viewing results for ${userId}_${challengeId}`);
  }

  /**
   * Actions for UI icons
   */
  static onChefHat(challengeId: string): void {
    // TODO: Implement chef-hat action (e.g., show tips)
    console.log(`Chef hat action on ${challengeId}`);
  }

  static onMoreOptions(challengeId: string): void {
    // TODO: Implement more options menu
    console.log(`More options for ${challengeId}`);
  }
}