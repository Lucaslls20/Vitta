// src/viewmodels/RecipeViewModel.ts

import { useState, useEffect } from 'react';
import { Recipe, RecipeApiResponse } from '../Models/HomeModelSpoonacular';
import { APIKEY } from '../Services/SpoonacularConfig';

// URL base da API da Spoonacular
const BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * Hook que encapsula a lógica de obtenção de receitas fitness da Spoonacular.
 *
 * @returns {Object} - Objeto contendo:
 *   - recipes: Array de receitas.
 *   - loading: Boolean indicando se os dados estão sendo carregados.
 *   - error: Mensagem de erro, caso ocorra.
 *   - refresh: Função para refazer a busca das receitas.
 */
export const useRecipeViewModel = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Função assíncrona que busca receitas fitness utilizando o endpoint `complexSearch`.
   */
  const fetchFitnessRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Exemplo de chamada à API com o filtro de receitas fitness.
      // O parâmetro "tags=fitness" é utilizado para filtrar as receitas.
      // O parâmetro "addRecipeInformation=true" pode ser usado para obter mais detalhes.
      const response = await fetch(
        `${BASE_URL}/complexSearch?tags=fitness&apiKey=${APIKEY}&addRecipeInformation=true`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar receitas.');
      }

      const data: RecipeApiResponse = await response.json();
      setRecipes(data.results);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar receitas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect para carregar as receitas ao montar o componente.
  useEffect(() => {
    fetchFitnessRecipes();
  }, []);

  return {
    recipes,
    loading,
    error,
    refresh: fetchFitnessRecipes,
  };
};
