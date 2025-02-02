import { useState, useEffect } from 'react';
import { NutritionData } from '../Models/HomeModelNutricion';
import { DailySummary } from '../Models/HomeModelNutricion';
import { APIKEY, APP_ID } from '../Services/NutritionixConfig';
import { COLORS } from '../View/Colors';

export const useHomeViewModel = () => {
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNutritionData = async (query: string) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-key': APIKEY,
          'x-app-id': APP_ID,
        },
        body: JSON.stringify({
          query,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          aggregate: 'total', // Obter total de nutrientes
          line_delimited: false,
          use_raw_foods: false,
        }),
      });

      if (!response.ok) throw new Error(handleApiError(response.status));

      const data = await response.json();
      if (data.foods?.length === 0) throw new Error('Alimento não encontrado');

      const food = data.foods[0];
      const nutritionData: NutritionData = {
        calories: Math.round(food.nf_calories),
        protein: Math.round(food.nf_protein),
        fat: Math.round(food.nf_total_fat),
        carbs: Math.round(food.nf_total_carbohydrate),
        sugars: food.nf_sugars,
        fiber: food.nf_dietary_fiber,
        cholesterol: food.nf_cholesterol,
        sodium: food.nf_sodium,
        servingWeightGrams: food.serving_weight_grams,
      };

      // Adicionar ao histórico diário
      setDailySummary(prev => ({
        calories: (prev?.calories || 0) + nutritionData.calories,
        markedDates: {
          ...prev?.markedDates,
          [new Date().toISOString().split('T')[0]]: { marked: true, dotColor: COLORS.primary }
        }
      }));

      setNutrition(nutritionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return {
    nutrition,
    dailySummary,
    loading,
    error,
    setError,
    fetchNutritionData,
  };
};

const handleApiError = (status: number): string => {
  switch (status) {
    case 400:
      return 'Requisição inválida. Verifique os dados enviados.';
    case 401:
      return 'Não autorizado. Verifique sua chave de API.';
    case 404:
      return 'Recurso não encontrado.';
    case 500:
      return 'Erro interno do servidor. Tente novamente mais tarde.';
    default:
      return 'Ocorreu um erro inesperado.';
  }
};
