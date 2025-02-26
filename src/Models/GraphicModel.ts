export interface CalorieEntry {
    id: string;
    date: Date;
    totalCalories: number;
    userId: string;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: {
      data: number[];
      color: (opacity?: number) => string;
      strokeWidth: number;
    }[];
  }
  
  export interface QuickStats {
    currentDay: number;
    periodTotal: number;
    comparisonPercentage: number;
    goal: number;
  }
  
  export interface WeeklyHighlights {
    bestDay: { day: string; calories: number };
    averageCalories: number;
  }

