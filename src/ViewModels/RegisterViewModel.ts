import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { RegisterViewModel } from '../Models/RegisterModel';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../App';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useRegisterViewModel = (): RegisterViewModel => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProps>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const register = async (): Promise<void> => {
    setError(null);
    setLoading(true);

    if (password === '' && email === '' && confirmPassword === '' && name === '' || !phoneNumber) {
      setError('All fields are empty. Fill them in.');
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('The password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Obtenha o UID do usuário recém-criado
      const uid = userCredential.user.uid;

      // Salve os dados adicionais no Firestore
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        phone: phoneNumber,
        // NÃO SALVE A SENHA em texto puro!
      });

      // Navegue para a próxima tela
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch (err: any) {
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'This email is already in use.',
        'auth/invalid-email': 'The email provided is invalid.',
        'auth/weak-password': 'The password must be at least 6 characters long.',
      };
      setError(errorMessages[err.code] || 'Error creating account. Please try again.');
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
    phoneNumber,
    register,
    setEmail,
    setName,
    setPassword,
    setConfirmPassword,
    setPhoneNumber,
  };
};
