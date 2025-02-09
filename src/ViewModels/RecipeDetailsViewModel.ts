import { useState, useEffect } from 'react';
import { APIKEY } from '../Services/SpoonacularConfig';
import { RecipeDetails } from '../Models/RecipeDetailsModel';

const BASE_URL = 'https://api.spoonacular.com/recipes';
const GLYCEMIC_LOAD_URL = 'https://api.spoonacular.com/food/ingredients/glycemicLoad';

export const useRecipeDetailsViewModel = (recipeId: number) => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/${recipeId}/information?apiKey=${APIKEY}`
      );

      if (!response.ok) throw new Error('Erro ao buscar detalhes da receita');

      const data = await response.json();
     

      // Obtemos os ingredientes da receita
      const ingredients = data.extendedIngredients.map((ing: any) => ({
        id: ing.id,
        amount: ing.amount,
        unit: ing.unit,
      }));

 
      const price = (data.pricePerServing / 100).toFixed(2)

      // Mapeamento dos dados da API para nosso modelo
      const mappedDetails: RecipeDetails = {
        id: data.id,
        title: data.title,
        imageUrl: data.image,
        preparationTime: `${data.readyInMinutes} min`,
        pricePerServing: `$${price}`,
        ingredients: data.extendedIngredients.map((ing: any) => ing.original),
        preparationSteps: data.analyzedInstructions[0]?.steps.map((step: any) => step.step) || [],
      };

      setRecipeDetails(mappedDetails);
    } catch (err) {
      setError('Erro ao carregar detalhes da receita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipeId) fetchRecipeDetails();
  }, [recipeId]);

  return { recipeDetails, loading, error };
};

// Função para buscar a carga glicêmica dos ingredientes
const fetchGlycemicLoad = async (ingredients: { id: number; amount: number; unit: string }[]) => {
  try {
    // Adiciona a API key na URL como query parameter
    const url = `${GLYCEMIC_LOAD_URL}?apiKey=${APIKEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Corrige o corpo para usar "quantity" e remove a API key
      body: JSON.stringify({
        ingredients: ingredients.map(ing => ({
          id: ing.id,
          quantity: ing.amount, // Alterado de "amount" para "quantity"
          unit: ing.unit,
        })),
      }),
    });

    if (!response.ok) {
      // Log detalhado do erro
      const errorText = await response.text();
      console.error('Erro na resposta:', errorText);
      throw new Error('Erro ao buscar carga glicêmica');
    }

    const data = await response.json();
    
    // Calcula a média (ajuste conforme a estrutura real da resposta)
    const totalLoad = data.totalGlycemicLoad || 0; // Verifique a estrutura real
    const avgLoad = totalLoad; // Ou calcule com base nos ingredientes

    return avgLoad.toFixed(2);
  } catch (error) {
    console.error('Erro ao calcular a carga glicêmica:', error);
    return 'Indisponível';
  }
};

