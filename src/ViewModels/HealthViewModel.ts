// src/viewModels/RecipesViewModel.ts

import { Recipe } from '../Models/HealthModel';
import { APIKEY } from '../Services/SpoonacularConfig';

export class RecipesViewModel {

  public breakfastRecipes: Recipe[] = [];
  public lunchRecipes: Recipe[] = [];
  public dinnerRecipes: Recipe[] = [];

  constructor() {
    this.loadRecipes();
  }

  /**
   * Carrega as receitas para os três tipos de refeição em paralelo.
   */
  private async loadRecipes(): Promise<void> {
    try {
      // Para almoço, usamos "main course", pois é o valor aceito pela API para esse tipo.
      await Promise.all([
        this.fetchRecipes('breakfast').then((recipes) => (this.breakfastRecipes = recipes)),
        this.fetchRecipes('main course').then((recipes) => (this.lunchRecipes = recipes)),
        this.fetchRecipes('dinner').then((recipes) => (this.dinnerRecipes = recipes))
      ]);
    } catch (error) {
      console.error('Erro ao carregar receitas saudáveis:', error);
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
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data = await response.json();
      // A propriedade "results" deve conter um array de receitas com ao menos os campos "id", "title" e "image".
      return data.results as Recipe[];
    } catch (error) {
      console.error(`Erro ao buscar receitas do tipo "${mealType}":`, error);
      return [];
    }
  }
}
