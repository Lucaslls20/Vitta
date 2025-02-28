
export interface RegisterViewModel {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    loading: boolean;
    error: string | null;
    phoneNumber: string
    register: () => Promise<void>;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setName: (name:string) => void;
    setPhoneNumber: (phoneNumber:string) => void
  }