import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Sticky header styling
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,              
    textAlign: 'center',   
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  
  progressBar: {
    height: 4,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 80, // Space for the fixed button at the bottom
  },
  scrollContent: {
    paddingVertical: 20,
  },
  date: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  // Clause card styling for clear sectioning
  clauseCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clauseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.accent,
    paddingBottom: 4,
  },
  clauseText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    textAlign: 'justify',
  },
  // Fixed footer button styling
  acceptButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  acceptButtonLabel: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Style for disabled state of the Accept button
  disabledButton: {
    backgroundColor: COLORS.border,
  },
});
