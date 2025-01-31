
export interface LoginViewModel {
    email: string;
    password: string;
    loading: boolean;
    error: string | null;
    login: () => Promise<void>;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
  }