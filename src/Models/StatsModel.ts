
export interface DateStats {
    month: string; // dois dígitos
    day:   string; // dois dígitos
    year:  string; // quatro dígitos
  }
  
  /**
   * Constrói um objeto DateStats a partir de um Date.
   * Formato dos EUA: MM/DD/YYYY
   */
  export class StatsModel {
    static fromDate(date: Date = new Date()): DateStats {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day   = String(date.getDate()).padStart(2, '0');
      const year  = String(date.getFullYear());
      return { month, day, year };
    }
  }
  