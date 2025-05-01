
import { useState, useEffect } from 'react';
import { DateStats, StatsModel } from '../Models/StatsModel';

interface StatsViewModel {
  statsData: { value: string; label: string }[];
}

const useStatsViewModel = (): StatsViewModel => {
  const [currentStats, setCurrentStats] = useState<DateStats>(StatsModel.fromDate());

  useEffect(() => {
    // Atualiza a data ao montar
    setCurrentStats(StatsModel.fromDate());

    // (Opcional) Se quiser que o hook recalcule à meia-noite:
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime()
      - now.getTime();

    const timeout = setTimeout(() => {
      setCurrentStats(StatsModel.fromDate());
      // depois de meia-noite, podemos querer agendar outro timeout de 24h, mas
      // para simplicidade omitimos recursividade.
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  const statsData = [
    { value: currentStats.month, label: 'Month' },
    { value: currentStats.day,   label: 'Day'   },
    { value: currentStats.year,  label: 'Year'  },
  ];

  return { statsData };
};

export default useStatsViewModel;
