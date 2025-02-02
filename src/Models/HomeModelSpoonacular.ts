
export interface Recipe {
    id: number;
    title: string;
    image: string;
    summary?: string;
  }

  export interface RecipeApiResponse {
    results: Recipe[];
    offset: number;
    number: number;
    totalResults: number;
  }

