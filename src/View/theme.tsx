import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsModel, { UserSettings } from '../Models/DarkModeModel';
import { auth } from '../Services/firebaseConfig';

export interface ThemeContextData {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
  loading: boolean;
}

export const ThemeContext = createContext<ThemeContextData>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  setDarkMode: () => {},
  loading: true
});

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = '@app:theme';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carregar configurações ao iniciar
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        // Primeiro tenta carregar do AsyncStorage (para usuários não logados)
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        
        if (storedTheme !== null) {
          setIsDarkMode(storedTheme === 'dark');
        } else {
          // Se não houver tema no AsyncStorage, tenta carregar do Firestore para usuários logados
          const Auth = auth;
          const user = Auth.currentUser;
          
          if (user) {
            const settings = await SettingsModel.loadSettings(user.uid);
            setIsDarkMode(settings.darkMode);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
      } finally {
        setLoading(false);
      }
    };

    loadThemeSettings();
  }, []);

  // Salvar configurações quando o tema mudar
  useEffect(() => {
    const saveThemeSettings = async () => {
      if (loading) return; // Não salva durante o carregamento inicial
      
      try {
        // Sempre salva no AsyncStorage
        await AsyncStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
        
        // Salva no Firestore apenas se o usuário estiver logado
        const Auth = auth;
        const user = Auth.currentUser;
        
        if (user) {
          // Carregar configurações atuais primeiro para não perder outras preferências
          const currentSettings = await SettingsModel.loadSettings(user.uid);
          await SettingsModel.saveSettings(user.uid, {
            ...currentSettings,
            darkMode: isDarkMode
          });
        }
      } catch (error) {
        console.error('Erro ao salvar tema:', error);
      }
    };

    saveThemeSettings();
  }, [isDarkMode, loading]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setDarkMode = (value: boolean) => {
    setIsDarkMode(value);
  };

  const contextValue: ThemeContextData = {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    loading
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};