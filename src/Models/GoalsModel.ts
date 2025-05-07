
export interface Goal {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
  }
  
  export interface NewGoal {
    title: string;
    description: string;
    deadline: Date;
  }