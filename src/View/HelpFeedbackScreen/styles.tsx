import { StyleSheet } from "react-native";
import {COLORS} from '../Colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 4,
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  searchSection: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 8,
  },
  searchInput: {
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  faqQuestion: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  faqAnswerContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 8,
  },
  contactSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  contactButton: {
    marginVertical: 8,
  },
  feedbackTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  optionalLabel: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.textSecondary,
  },
  problemTypesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  problemTypeChip: {
    marginRight: 8,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  selectedProblemTypeChip: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
  },
  selectedChipText: {
    color: COLORS.primary,
  },
  feedbackInput: {
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 24,
  },
  attachmentButtonText: {
    marginLeft: 8,
    color: COLORS.primary,
  },
  sendButton: {
    marginBottom: 24,
  },
  rateSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  rateTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  rateButton: {
    width: '60%',
  },
  dialog: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  dialogTitle: {
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
  dialogText: {
    textAlign: 'center',
    marginBottom: 16,
    color: COLORS.textSecondary,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  starContainer: {
    padding: 6,
  },
  spacer: {
    height: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
backButton:{
  position: 'absolute',
  left:  10,            
  justifyContent: 'center', 
  alignItems: 'center',
  height: '100%',
  paddingHorizontal: 8,     
}
});
