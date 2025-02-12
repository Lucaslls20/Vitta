import { Recipe } from '../Models/HealthModel';
import { APIKEY } from '../Services/SpoonacularConfig';

export class RecipesViewModel {

  public breakfastRecipes: Recipe[] = [];
  public lunchRecipes: Recipe[] = [];
  public dinnerRecipes: Recipe[] = [];

  constructor() {
    this.loadRecipes();
  }
  private async loadRecipes(): Promise<void> {
    try {
      await Promise.all([
        this.fetchRecipes('breakfast').then((recipes) => (this.breakfastRecipes = recipes)),
        this.fetchRecipes('main course').then((recipes) => (this.lunchRecipes = recipes)),
        this.fetchRecipes('dinner').then((recipes) => (this.dinnerRecipes = recipes))
      ]);
    } catch (error) {
      console.error('Error loading healthy recipes:', error);
    }
  }

  /**
   * Realiza a requisição para a Spoonacular filtrando pelo tipo de refeição e priorizando receitas saudáveis.
   * 
   * @param mealType - O tipo de refeição (ex.: "breakfast", "main course" ou "dinner").
   * @returns Uma Promise com um array de receitas.
   */
  private async fetchRecipes(mealType: string): Promise<Recipe[]> {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&type=${encodeURIComponent(
        mealType
      )}&sort=healthiness&number=10`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request error: ${response.statusText}`);
      }
      const data = await response.json();
      
      return data.results as Recipe[];
    } catch (error) {
      console.error(`Error when searching for recipes like "${mealType}":`, error);
      return [];
    }
  }
}
