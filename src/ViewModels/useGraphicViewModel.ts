import { useEffect, useState } from 'react';
import { db, auth } from '../Services/firebaseConfig';
import { CalorieEntry, ChartData, QuickStats, WeeklyHighlights } from '../Models/GraphicModel';
import { collection, query, where, onSnapshot, QuerySnapshot, DocumentData, updateDoc, Timestamp } from 'firebase/firestore';
import { COLORS } from '../View/Colors';

const useCalorieViewModel = () => {
  const [entries, setEntries] = useState<CalorieEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [userId, setUserId] = useState<string | null>(null);

  // Função auxiliar para formatar números com no máximo duas casas decimais
  const formatNumber = (num: number): number => Number(num.toFixed(2));

  // Obtém o usuário autenticado via Firebase Auth
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Busca os dados do Firestore apenas se houver um usuário autenticado
  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, 'calorias'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const fetchedEntries: CalorieEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let entryDate: Date;

        if (data.date && typeof data.date.toDate === 'function') {
          // Se data é um Timestamp do Firestore, converte para Date
          entryDate = data.date.toDate();
        } else if (typeof data.date === 'string') {
          // Se data é uma string, converte para Date e atualiza o documento para usar Timestamp
          entryDate = new Date(data.date);
          updateDoc(doc.ref, { date: Timestamp.fromDate(entryDate) })
            .catch((err) => console.error(`Falha ao atualizar documento ${doc.id}:`, err));
        } else {
          console.error('Documento sem data válida:', doc.id);
          return; // Ignora o documento
        }

        fetchedEntries.push({
          id: doc.id,
          date: entryDate,
          totalCalories: data.totalCalories,
          userId: data.userId,
        });
      });
      setEntries(fetchedEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const filterEntriesByPeriod = (
    entries: CalorieEntry[], 
    period: 'week' | 'month' | 'year',
    previousPeriod = false
  ): CalorieEntry[] => {
    const today = new Date();
    let startDate: Date;
    let endDate: Date;
    const periodOffset = previousPeriod ? -1 : 0;

    switch (period) {
      case 'week': {
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek;
        startDate = new Date(today.getFullYear(), today.getMonth(), diff + (periodOffset * 7));
        endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
        break;
      }
      case 'month': {
        startDate = new Date(today.getFullYear(), today.getMonth() + periodOffset, 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + periodOffset + 1, 0);
        break;
      }
      case 'year': {
        startDate = new Date(today.getFullYear() + periodOffset, 0, 1);
        endDate = new Date(today.getFullYear() + periodOffset, 11, 31);
        break;
      }
      default: {
        startDate = new Date();
        endDate = new Date();
      }
    }

    return entries.filter((entry) => 
      entry.date >= startDate && entry.date <= endDate
    );
  };

  const getChartData = (): ChartData => {
    const filteredEntries = filterEntriesByPeriod(entries, period);
    
    if (filteredEntries.length === 0) {
      return {
        labels: [''],
        datasets: [{
          data: [0],
          color: () => COLORS.primary,
          strokeWidth: 2,
        }],
      };
    }
    
    const groupedData = filteredEntries.reduce((acc, entry) => {
      const key = period === 'week' 
        ? entry.date.toLocaleDateString('pt-BR', { weekday: 'short' })
        : period === 'month'
        ? `Semana ${Math.ceil(entry.date.getDate() / 7)}`
        : entry.date.toLocaleDateString('pt-BR', { month: 'short' });
        
      acc[key] = (acc[key] || 0) + entry.totalCalories;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData).map(formatNumber);

    return {
      labels,
      datasets: [{
        data,
        color: () => COLORS.primary,
        strokeWidth: 2,
      }],
    };
  };

  const getQuickStats = (): QuickStats => {
    const filteredEntries = filterEntriesByPeriod(entries, period);
    const todayStr = new Date().toISOString().split('T')[0];
    const currentDayEntry = entries.find((entry) =>
      entry.date.toISOString().split('T')[0] === todayStr
    );

    return {
      currentDay: formatNumber(currentDayEntry?.totalCalories || 0),
      periodTotal: formatNumber(filteredEntries.reduce((sum, entry) => sum + entry.totalCalories, 0)),
      comparisonPercentage: calculateComparison(),
      goal: 3000,
    };
  };

  const getWeeklyHighlights = (): WeeklyHighlights => {
    const periodEntries = filterEntriesByPeriod(entries, period);
    return {
      bestDay: findBestDay(periodEntries),
      averageCalories: calculateAverage(periodEntries),
    };
  };

  const calculateComparison = () => {
    const currentEntries = filterEntriesByPeriod(entries, period);
    const previousEntries = filterEntriesByPeriod(entries, period, true);
    const currentTotal = currentEntries.reduce((sum, entry) => sum + entry.totalCalories, 0);
    const previousTotal = previousEntries.reduce((sum, entry) => sum + entry.totalCalories, 0);
    if (previousTotal === 0) return 0;
    return Number(((currentTotal - previousTotal) / previousTotal * 100).toFixed(1));
  };

  const findBestDay = (entries: CalorieEntry[]) => {
    if (entries.length === 0) return { day: '', calories: 0 };
    const bestEntry = entries.reduce((max, entry) => 
      entry.totalCalories > max.totalCalories ? entry : max
    );
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return {
      day: dayNames[bestEntry.date.getDay()],
      calories: formatNumber(bestEntry.totalCalories)
    };
  };

  const calculateAverage = (entries: CalorieEntry[]) => {
    if (entries.length === 0) return 0;
    const total = entries.reduce((sum, entry) => sum + entry.totalCalories, 0);
    return formatNumber(total / entries.length);
  };

  return {
    loading,
    period,
    setPeriod,
    chartData: getChartData(),
    quickStats: getQuickStats(),
    weeklyHighlights: getWeeklyHighlights(),
    entries,
  };
};

export default useCalorieViewModel;
