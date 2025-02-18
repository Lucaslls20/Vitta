import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.secondary,
      padding: 16,
    },
    card: {
      marginBottom: 16,
      borderRadius: 8,
      elevation: 3,
      backgroundColor: COLORS.white,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.textPrimary,
      marginBottom: 4,
    },
    date: {
      fontSize: 14,
      color: COLORS.textSecondary,
    },
    scrollContainer: {
      flex: 1,
      marginBottom: 16,
    },
    scrollContent: {
      padding: 16,
      backgroundColor: COLORS.white,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    clauseTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.textPrimary,
      marginTop: 8,
      marginBottom: 8,
    },
    clauseText: {
      fontSize: 16,
      color: COLORS.textSecondary,
      marginBottom: 16,
      textAlign: 'justify',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    button: {
      flex: 1,
      marginHorizontal: 4,
      borderColor: COLORS.primary,
    },
    buttonLabel: {
      color: COLORS.primary,
    },
    acceptButton: {
      alignSelf: 'center',
      width: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 8,
    },
    acceptButtonLabel: {
      color: COLORS.white,
      fontWeight: 'bold',
    },
  });
  