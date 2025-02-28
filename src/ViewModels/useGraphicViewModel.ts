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

  // Função auxiliar para formatar números com até duas casas decimais
  const formatNumber = (num: number): number => Number(num.toFixed(2));

  // Obtém o usuário autenticado
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

  // Busca dados do Firestore quando há usuário autenticado
  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, 'calorias'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const fetchedEntries: CalorieEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let entryDate: Date;

        if (data.date && typeof data.date.toDate === 'function') {
          entryDate = data.date.toDate();
        } else if (typeof data.date === 'string') {
          entryDate = new Date(data.date);
          updateDoc(doc.ref, { date: Timestamp.fromDate(entryDate) })
            .catch((err) => console.error(`Falha ao atualizar documento ${doc.id}:`, err));
        } else {
          console.error('Documento sem data válida:', doc.id);
          return;
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

  // Filtra as entradas conforme o período (atual ou anterior)
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
        endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
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

    return entries.filter((entry) => entry.date >= startDate && entry.date <= endDate);
  };

  // Função auxiliar para comparar se duas datas são iguais (dia, mês e ano)
  const isSameDay = (d1: Date, d2: Date): boolean => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  // Gera os dados do gráfico conforme o período selecionado
  const getChartData = (): ChartData => {
    const filteredEntries = filterEntriesByPeriod(entries, period);
    let labels: string[] = [];
    let data: number[] = [];
    const today = new Date();

    if (period === 'week') {
      // Gera todos os dias da semana atual
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      const daysInWeek: Date[] = [];
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        daysInWeek.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      labels = daysInWeek.map(day => 
        day.toLocaleDateString('en-US', { weekday: 'short' }) // 🇺🇸 Changed
      );
      data = daysInWeek.map(day => 
        filteredEntries
          .filter(entry => isSameDay(entry.date, day))
          .reduce((sum, entry) => sum + entry.totalCalories, 0)
      );
    } else if (period === 'month') {
      // Gera todas as semanas do mês
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      const weeksCount = Math.ceil(lastDay / 7);
      labels = Array.from({ length: weeksCount }, (_, i) => `Week ${i + 1}`); // 🇺🇸 Changed
      
      data = labels.map((_, weekIndex) => {
        const startDay = weekIndex * 7 + 1;
        const endDay = Math.min((weekIndex + 1) * 7, lastDay);
        return filteredEntries
          .filter(entry => 
            entry.date.getMonth() === today.getMonth() &&
            entry.date.getDate() >= startDay && 
            entry.date.getDate() <= endDay
          )
          .reduce((sum, entry) => sum + entry.totalCalories, 0);
      });
    } else {
      // Gera todos os meses do ano
      labels = Array.from({ length: 12 }, (_, i) =>
        new Date(today.getFullYear(), i, 1).toLocaleDateString('en-US', { month: 'short' }) // 🇺🇸 Changed
      );
      data = labels.map((_, monthIndex) =>
        filteredEntries
          .filter(entry => 
            entry.date.getFullYear() === today.getFullYear() &&
            entry.date.getMonth() === monthIndex
          )
          .reduce((sum, entry) => sum + entry.totalCalories, 0)
      );
    }

    return {
      labels,
      datasets: [{
        data: data.map(Number),
        color: () => COLORS.primary,
        strokeWidth: 2,
      }]
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
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // 🇺🇸 Changed
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
