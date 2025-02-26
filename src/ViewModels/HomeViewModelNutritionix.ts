import { useState, useEffect } from 'react';
import { NutritionData, DailySummary } from '../Models/HomeModelNutricion';
import { APIKEY, APP_ID } from '../Services/NutritionixConfig';
import { COLORS } from '../View/Colors';
import { auth, db } from '../Services/firebaseConfig';
import { 
  collection, query, where, onSnapshot, doc, setDoc, updateDoc, getDoc, increment, serverTimestamp } from 'firebase/firestore';

export const useHomeViewModel = () => {
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [dailySummary, setDailySummary] = useState<DailySummary>({ calories: 0, markedDates: {}, dailyCalories: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(auth.currentUser);

  // Monitora alterações na autenticação do usuário
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  // Carrega dados do Firestore quando o usuário muda
  useEffect(() => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    const fetchDailyData = async () => {
      try {
        const userRef = doc(db, 'calorias', `${user.uid}_${today}`);
        const userSnap = await getDoc(userRef);

        // Cria documento se não existir
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            userId: user.uid,
            date: today,
            totalCalories: 0,
            createdAt: serverTimestamp(),
          });
        }

        // Configura listener para atualizações em tempo real
        const q = query(collection(db, 'calorias'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const dailyCalories: { [date: string]: number } = {};
          const markedDates: { [date: string]: any } = {};

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const dateValue = data.date;
            // Converte o campo de data para string no formato "YYYY-MM-DD"
            const dateStr = (typeof dateValue === 'object' && dateValue.toDate)
              ? dateValue.toDate().toISOString().split('T')[0]
              : dateValue;
            const calories = data.totalCalories;
            
            dailyCalories[dateStr] = calories;
            
            // Marca datas com calorias registradas
            if (calories > 0) {
              markedDates[dateStr] = { marked: true, dotColor: COLORS.primary };
            }
          });

          // Atualiza estado com dados do dia atual
          const todayCalories = dailyCalories[today] || 0;
          setDailySummary(prev => ({
            ...prev,
            dailyCalories,
            calories: todayCalories,
            markedDates: {
              ...prev.markedDates,
              ...markedDates
            }
          }));
        });

        return unsubscribe;
      } catch (err) {
        console.error('Erro ao buscar dados diários:', err);
      }
    };

    fetchDailyData();
  }, [user]); // Executa quando o usuário muda

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
          timezone: "US/Eastern"
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(handleApiError(response.status));
      }

      const data = await response.json();
      if (!data.foods || data.foods.length === 0) throw new Error('Alimento não encontrado');

      // Calcula totais nutricionais
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

      // Atualiza dados no Firestore
      const currentDate = new Date().toISOString().split('T')[0];
      const calorieDocRef = doc(db, 'calorias', `${user!.uid}_${currentDate}`);

      try {
        await updateDoc(calorieDocRef, {
          totalCalories: increment(totalNutrition.calories),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        await setDoc(calorieDocRef, {
          userId: user!.uid,
          date: currentDate,
          totalCalories: totalNutrition.calories,
          createdAt: serverTimestamp(),
        });
      }

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
      return 'Dados inválidos. Verifique as informações enviadas.';
    case 401:
      return 'Autenticação inválida. Verifique suas credenciais.';
    case 404:
      return 'Recurso não encontrado.';
    case 500:
      return 'Erro interno no servidor. Tente novamente mais tarde.';
    default:
      return 'Ocorreu um erro inesperado.';
  }
};
