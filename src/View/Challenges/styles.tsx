import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 8,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.textPrimary,
    },
    featuredChallenge: {
      margin: 16,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 4,
    },
    featuredImage: {
      height: 180,
      width: '100%',
    },
    featuredContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    featuredOverlay: {
      padding: 16,
      justifyContent: 'flex-end',
      height: '100%',
    },
    featuredTitle: {
      color: COLORS.white,
      fontSize: 24,
      fontWeight: 'bold',
    },
    featuredSubtitle: {
      color: COLORS.white,
      marginBottom: 16,
    },
    featuredButton: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.primary,
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    tab: {
      paddingVertical: 12,
      marginRight: 24,
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
      fontWeight: 'bold',
    },
    filterSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    resultCount: {
      color: COLORS.textSecondary,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    filterText: {
      color: COLORS.textPrimary,
    },
    listContent: {
      paddingBottom: 80,
    },
    challengeCard: {
      margin: 12,
      marginTop: 4,
      marginBottom: 12,
      borderRadius: 12,
      elevation: 2,
      backgroundColor: COLORS.white,
    },
    recipeCover: {
      height: 140,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
      marginTop: 8,
    },
    cardTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    title: {
      marginLeft: 12,
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.textPrimary,
      flex: 1,
    },
    description: {
      color: COLORS.textSecondary,
      marginBottom: 12,
    },
    challengeInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    categoryText: {
      color: COLORS.primary,
      fontWeight: '500',
    },
    daysText: {
      color: COLORS.textSecondary,
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    progressBar: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      backgroundColor: COLORS.secondary,
    },
    progressText: {
      marginLeft: 8,
      color: COLORS.textPrimary,
      fontWeight: 'bold',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    stat: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontWeight: 'bold',
      color: COLORS.textPrimary,
    },
    statLabel: {
      fontSize: 12,
      color: COLORS.textSecondary,
    },
    cardActions: {
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      paddingTop: 8,
    },
    joinButton: {
      backgroundColor: COLORS.primary,
      flex: 1,
      marginRight: 8,
    },
    trackButton: {
      backgroundColor: COLORS.primary,
      flex: 1,
      marginRight: 8,
    },
    completedButton: {
      borderColor: COLORS.status.completed,
      flex: 1,
      marginRight: 8,
    },
    buttonLabel: {
      color: COLORS.white,
      fontWeight: 'bold',
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
    },
    dialog: {
      backgroundColor: COLORS.white,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 180,
    },
    loadingText: {
      marginTop: 16,
      color: COLORS.textSecondary,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      marginTop: 32,
    },
    emptyTitle: {
      marginTop: 16,
      color: COLORS.textPrimary,
    },
    emptyText: {
      color: COLORS.textSecondary,
      textAlign: 'center',
      marginTop: 8,
    },
    dialogSection: {
      marginTop: 16,
    },
    dialogLabel: {
      fontWeight: 'bold',
      color: COLORS.textPrimary,
      marginBottom: 4,
    },
    dialogDescription: {
      color: COLORS.textSecondary,
    },
  });
  