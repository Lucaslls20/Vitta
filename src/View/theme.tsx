import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { COLORS } from './Colors';

export interface ThemeContextData {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  setDarkMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Optionally load from AsyncStorage or Firestore
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setDarkMode = (value: boolean) => {
    setIsDarkMode(value);
  };

  const customLightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: COLORS.primary,
      secondary: COLORS.secondary,
      accent: COLORS.accent,
      background: COLORS.white,
      surface: COLORS.white,
      text: COLORS.text.primary,
      onSurface: COLORS.text.secondary,
      error: COLORS.error,
    },
  };

  const customDarkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: COLORS.primary,
      secondary: COLORS.secondary,
      accent: COLORS.accent,
      background: COLORS.text.primary,
      surface: COLORS.text.primary,
      text: COLORS.text.light,
      onSurface: COLORS.text.secondary,
      error: COLORS.error,
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, setDarkMode }}>
      <PaperProvider theme={isDarkMode ? customDarkTheme : customLightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
