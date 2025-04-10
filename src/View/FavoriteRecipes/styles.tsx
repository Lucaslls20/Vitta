import { COLORS } from "../Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    backgroundColor: COLORS.primary,
    elevation: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  cardContainer: {
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  cardImage: {
    height: 180,
  },
  cardContent: {
    paddingVertical: 12,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor:COLORS.secondary,
    borderRadius:10,
    justifyContent:'center',
    gap:1
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  detailText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginHorizontal:5
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  cuisineChip: {
    backgroundColor: COLORS.accent,
    marginRight: 8,
    marginBottom: 4,
    height: 28,
  },
  chipText: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
  favoriteIcon: {
    margin: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: 300,
  },
  emptyIcon: {
    margin: 0,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  browseButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  separator: {
    height: 16,
  },
});
