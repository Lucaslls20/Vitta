import { useState, useEffect } from 'react';
import { Recipe, RecipeApiResponse } from '../Models/HomeModelSpoonacular';
import { APIKEY } from '../Services/SpoonacularConfig';

const BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * Hook que encapsula a lógica de obtenção de receitas de acordo com uma dieta específica.
 *
 * @param {string} diet - Tipo de dieta a ser filtrada (ex: "ketogenic", "vegetarian", "vegan").
 * @returns {Object} - Objeto contendo:
 *   - recipes: Array de receitas.
 *   - loading: Boolean indicando se os dados estão sendo carregados.
 *   - error: Mensagem de erro, caso ocorra.
 *   - refresh: Função para refazer a busca das receitas.
 */
export const useRecipeViewModel = (diet: string = 'fitness') => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipesByDiet = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/complexSearch?diet=${diet}&apiKey=${APIKEY}&addRecipeInformation=true`
      );

      if (!response.ok) {
        throw new Error('Error when searching for recipes.');
      }

      const data: RecipeApiResponse = await response.json();
      setRecipes(data.results);
    } catch (err) {
      console.error(err);
      setError('Error when searching for recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipesByDiet();
  }, [diet]);

  return {
    recipes,
    loading,
    error,
    refresh: fetchRecipesByDiet,
  };
};
