import {COLORS} from '../Colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  headerTitle: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20,
  },
  headerDivider: {
    backgroundColor: COLORS.shadow,
    height: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  periodContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop:10
  },
  periodChip: {
    marginRight: 8,
    backgroundColor: COLORS.primary,
  },
  selectedPeriodChip: {
    backgroundColor: COLORS.primary,
  },
  periodChipText: {
    color: COLORS.text.primary,
  },
  goalsContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  goalCard: {
    elevation: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  goalDescription: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  statusContainer: {
    justifyContent: 'center',
    paddingRight: 8,
  },
  cardDivider: {
    marginHorizontal: 16,
    backgroundColor: COLORS.shadow,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptySubtext: {
    color: COLORS.text.secondary,
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 48,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.text.primary,
  },
  input: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  multilineInput: {
    minHeight: 100,
    maxHeight: 200,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 24,
    height: 56,
  },
  dateLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 8,
    marginLeft: -8,
  },
  dateText: {
    color: COLORS.text.primary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cancelButton: {
    borderColor: COLORS.text.secondary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: COLORS.primary,
  },
});