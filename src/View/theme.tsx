import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { COLORS } from './Colors';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    accent: COLORS.accent,
    background: COLORS.white,
    surface: COLORS.white,
    text: COLORS.textPrimary,
    onSurface: COLORS.textSecondary,
    error: COLORS.error,
  },
};

export type AppTheme = typeof theme;