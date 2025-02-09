
export interface RecipeDetails {
  id: number;
  title: string;
  imageUrl: string;
  preparationTime: string;
  pricePerServing: string; // Alterado
  ingredients: string[];
  preparationSteps: string[];
}