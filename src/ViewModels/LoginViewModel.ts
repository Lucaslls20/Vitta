import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebaseConfig';// Ajuste o caminho conforme necessário
import { LoginViewModel } from '../Models/LoginModel';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../App';

export const useLoginViewModel = (): LoginViewModel => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProps>();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const login = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    if (!email || !password) {
        setError('Email e senha são obrigatórios.');
        setLoading(false);
        return;
    }

    if (!validateEmail(email)) {
        setError('Formato de email inválido.');
        setLoading(false);
        return;
    }

    if (password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres.');
        setLoading(false);
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Tabs');
        setLoading(false);
    } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error && "code" in err) {
            const errorCode = (err as any).code;
            switch (errorCode) {
                case 'auth/user-not-found':
                    setError('Usuário não encontrado.');
                    break;
                case 'auth/wrong-password':
                    setError('Senha incorreta.');
                    break;
                case 'auth/too-many-requests':
                    setError('Muitas tentativas falhas. Tente novamente mais tarde.');
                    break;
                default:
                    setError('Erro ao fazer login. Verifique se seus dados estão corretos.');
            }
        }
        setLoading(false);
    }
};

  return {
    email,
    password,
    loading,
    error,
    login,
    setEmail,
    setPassword,
  };
};
