import { useState, useEffect } from 'react';
import { NutritionData, DailySummary } from '../Models/HomeModelNutricion';
import { APIKEY, APP_ID } from '../Services/NutritionixConfig';
import { COLORS } from '../View/Colors';
import { auth, db } from '../Services/firebaseConfig';
import { collection, query, where, onSnapshot, doc, setDoc, updateDoc, getDoc, increment } from 'firebase/firestore';

export const useHomeViewModel = () => {
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [dailySummary, setDailySummary] = useState<DailySummary>({ calories: 0, markedDates: {}, dailyCalories: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    const fetchDailyData = async () => {
      try {
        const userRef = doc(db, 'calories', `${user.uid}_${today}`);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Se não houver registro para hoje, cria com 0 calorias
          await setDoc(userRef, {
            userId: user.uid,
            date: today,
            totalCalories: 0,
          });
        }

        // Pega os dados de calorias diárias
        const q = query(collection(db, 'calories'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const dailyCalories: { [date: string]: number } = {};
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            dailyCalories[data.date] = data.totalCalories;
          });
          setDailySummary((prev) => ({ ...prev, dailyCalories }));
        });

        return unsubscribe;
      } catch (err) {
        console.error('Erro ao buscar dados diários:', err);
      }
    };

    fetchDailyData();
  }, []);

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
        }),
      });

      if (!response.ok) throw new Error(handleApiError(response.status));

      const data = await response.json();
      if (!data.foods || data.foods.length === 0) throw new Error('Alimento não encontrado');

      const totalNutrition = data.foods.reduce(
        (acc: any, food: any) => ({
          calories: acc.calories + (food.nf_calories || 0),
          protein: acc.protein + (food.nf_protein || 0),
          fat: acc.fat + (food.nf_total_fat || 0),
          carbs: acc.carbs + (food.nf_total_carbohydrate || 0),
          sugars: acc.sugars + (food.nf_sugars || 0),
          fiber: acc.fiber + (food.nf_dietary_fiber || 0),
          cholesterol: acc.cholesterol + (food.nf_cholesterol || 0),
          sodium: acc.sodium + (food.nf_sodium || 0),
        }),
        {
          calories: 0, protein: 0, fat: 0, carbs: 0, sugars: 0, fiber: 0, cholesterol: 0, sodium: 0,
        }
      );

      setNutrition(totalNutrition);

      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      const currentDate = new Date().toISOString().split('T')[0];
      const calorieDocRef = doc(db, 'calories', `${user.uid}_${currentDate}`);

      try {
        await updateDoc(calorieDocRef, {
          totalCalories: increment(totalNutrition.calories),
        });
      } catch (error) {
        await setDoc(calorieDocRef, {
          userId: user.uid,
          date: currentDate,
          totalCalories: totalNutrition.calories,
        });
      }

      setDailySummary(prev => ({
        ...prev,
        calories: prev.calories + totalNutrition.calories,
        markedDates: {
          ...prev.markedDates,
          [currentDate]: { marked: true, dotColor: COLORS.primary },
        },
      }));
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
      return 'Invalid request. Check the sent data.';
    case 401:
      return 'Unauthorized. Check your API key.';
    case 404:
      return 'Resource not found.';
    case 500:
      return 'Internal server error. Please try again later.';
    default:
      return 'An unexpected error has occurred.';
  }
};
