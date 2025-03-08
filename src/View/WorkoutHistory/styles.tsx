import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";	

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
  },
  searchbar: {
    elevation: 2,
    backgroundColor:COLORS.secondary
  },
  filtrosContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtrosLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  filtrosScroll: {
    flexDirection: 'row',
  },
  filtroChip: {
    marginRight: 8,
    marginBottom: 5,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
    backgroundColor: COLORS.white,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: COLORS.secondary,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: COLORS.border,
  },
  exerciciosTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text.primary,
  },
  exercicioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  exercicioNome: {
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  cardActions: {
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    color: COLORS.text.secondary,
  },
  emptyButton: {
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});