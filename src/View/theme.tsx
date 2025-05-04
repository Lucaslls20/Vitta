import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
  loading: true,
});

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = '@app:theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadSettings = useCallback(async () => {
    let mounted = true;
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (mounted && stored) {
        setIsDarkMode(stored === 'dark');
      } else if (mounted) {
        const user = auth.currentUser;
        if (user) {
          const settings: UserSettings = await SettingsModel.loadSettings(user.uid);
          setIsDarkMode(settings.darkMode);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar tema', err);
    } finally {
      if (mounted) setLoading(false);
    }
    return () => { mounted = false; };
  }, []);

  const saveSettings = useCallback(
    async (dark: boolean) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
        const user = auth.currentUser;
        if (user) {
          const current = await SettingsModel.loadSettings(user.uid);
          await SettingsModel.saveSettings(user.uid, { ...current, darkMode: dark });
        }
      } catch (err) {
        console.error('Erro ao salvar tema', err);
      }
    },
    []
  );

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (!loading) {
      saveSettings(isDarkMode);
    }
  }, [isDarkMode, loading, saveSettings]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const setDarkMode = useCallback((value: boolean) => {
    setIsDarkMode(value);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, setDarkMode, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};
