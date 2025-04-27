export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    healthScore?: number;
    readyInMinutes?: number;
    servings?: number;
    nutrition?: {
      nutrients: Array<{
        name: string;
        amount: number;
        unit: string;
      }>;
    };
  }
  
  export interface Challenge {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    daysToComplete: number;
    currentDay?: number;
    progress: number;
    status: 'pending' | 'completed' | 'overdue' | 'active';
    icon?: string;
    reward?: string;
    participants?: number;
    recipeId?: number;
    recipeImage?: string;
    nutritionFocus?: string;
  }