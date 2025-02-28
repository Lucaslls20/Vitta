import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.border,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  periodButtonTextActive: {
    color: COLORS.white,
  },
  mainCard: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
    marginRight:30
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  tooltipText: {
    color: COLORS.white,
    fontSize: 12,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  quickStat: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginVertical: 8,
  },
  quickStatLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  quickStatGoal: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  comparisonText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  highlightsCard: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    marginBottom: 12,
  },
  highlightsContainer: {
    gap: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  actionCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCardText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
  goalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 2,
    borderColor: COLORS.error,
    alignItems: 'center',
  },
  goalLineText: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingHorizontal: 8,
    borderRadius: 4,
    top: -10,
  },
});