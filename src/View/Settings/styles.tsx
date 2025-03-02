import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    appbar: {
        backgroundColor: COLORS.primary,
        elevation: 4,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      appbarTitle: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
      },
    profileCard: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        backgroundColor: COLORS.primary,
    },
    profileInfo: {
        marginLeft: 16,
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    editProfileButton: {
        marginLeft: -8,
        alignSelf: 'flex-start',
    },
    editProfileLabel: {
        fontSize: 12,
        color: COLORS.primary,
    },
    settingsCard: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    sectionHeader: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    listItemTitle: {
        color: COLORS.textPrimary,
        fontSize: 16,
    },
    listItemDescription: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
    },
    logoutContainer: {
        padding: 16,
        alignItems: 'center',
        marginBottom: 32,
    },
    logoutButton: {
        width: '100%',
        borderRadius: 8,
        elevation: 2,
    },
    logoutButtonLabel: {
        fontSize: 16,
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    logoutDialog: {
        borderRadius: 12,
        backgroundColor: COLORS.white,
    },
    dialogTitle: {
        color: COLORS.textPrimary,
    },
    dialogContent: {
        color: COLORS.textSecondary,
    },
    userAvatar: {
        marginRight: 10,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        borderColor: COLORS.primary,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
});