import { useState, useEffect } from 'react';
import { APIKEY } from '../Services/SpoonacularConfig';
import { RecipeDetails } from '../Models/RecipeDetailsModel';

const BASE_URL = 'https://api.spoonacular.com/recipes';

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

      // Mapeamento dos dados da API para nosso modelo
      const mappedDetails: RecipeDetails = {
        id: data.id,
        title: data.title,
        imageUrl: data.image,
        preparationTime: `${data.readyInMinutes} min`,
        glycemicLoad: calculateGlycemicLoad(data), // Função de exemplo
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


// Exemplo de função para cálculo de carga glicêmica (adaptar conforme necessidade)
const calculateGlycemicLoad = (data: any): string => {
  // Implemente sua lógica real aqui com base nos dados nutricionais
  return 'Média'; // Valor mockado para exemplo
};