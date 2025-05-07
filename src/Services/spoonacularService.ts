// Services/spoonacularService.ts
import { Recipe } from '../Models/ChallengesModel';

const API_KEY = '7f5896bcc0644617a509b22ffc142782';
const BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * Busca um array de receitas aleatórias.
 * @param count Número de receitas a buscar
 * @returns Promise com lista de Recipe
 */
export async function fetchRandomRecipes(count: number): Promise<Recipe[]> {
  const url = `${BASE_URL}/random?apiKey=${API_KEY}&number=${count}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ao buscar receitas aleatórias: ${response.statusText}`);
  }
  const data = await response.json();
  // A resposta vem no formato { recipes: Recipe[] }
  return data.recipes as Recipe[];  // :contentReference[oaicite:0]{index=0}
}

/**
 * Busca uma receita aleatória para usar como destaques (featured).
 * @returns Promise com um único Recipe
 */
export async function fetchFeaturedRecipe(): Promise<Recipe> {
  const url = `${BASE_URL}/random?apiKey=${API_KEY}&number=1`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ao buscar receita em destaque: ${response.statusText}`);
  }
  const data = await response.json();
  // Retorna o primeiro (e único) item do array recipes
  return (data.recipes as Recipe[])[0];  // :contentReference[oaicite:1]{index=1}
}
