
export interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sugars?: number;
  fiber?: number;
  cholesterol?: number;
  sodium?: number;
  servingWeightGrams?: number;
}

export interface DailySummary {
  calories: number;
  markedDates: {
    [date: string]: { marked: boolean; dotColor: string };
  };
  dailyCalories: {
    [date: string]: number;
  };
}