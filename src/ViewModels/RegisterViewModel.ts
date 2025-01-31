import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebaseConfig';
import { RegisterViewModel } from '../Models/RegisterModel';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../App';

// Função para validar formato de email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useRegisterViewModel = (): RegisterViewModel => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProps>(); // Hook para navegação

  const register = async (): Promise<void> => {
    setError(null);
    setLoading(true);

    if(password === '' && email === '' && confirmPassword === ''){
      setError('Todos os campos estão vazios. Preencha-os.')
      setLoading(false)
      return;
    }

    if (!isValidEmail(email)) {
        setError('Por favor, insira um e-mail válido.');
        setLoading(false);
        return;
    }

    if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        setLoading(false);
        return;
    }

    if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        setLoading(false);
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate("Tabs");
    } catch (err: any) {
        const errorMessages: Record<string, string> = {
            'auth/email-already-in-use': 'Este e-mail já está em uso.',
            'auth/invalid-email': 'O e-mail fornecido é inválido.',
            'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
        };
        setError(errorMessages[err.code] || 'Erro ao criar conta. Tente novamente.');
    } finally {
        setLoading(false);
    }
};


  return {
    email,
    name,
    password,
    confirmPassword,
    loading,
    error,
    register,
    setEmail,
    setName,
    setPassword,
    setConfirmPassword,
  };
};
