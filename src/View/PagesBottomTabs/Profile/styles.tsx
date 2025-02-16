import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    header: {
      height: 220,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    avatarContainer: {
      alignItems: 'center',
    },
    avatar: {
      borderWidth: 3,
      borderColor: COLORS.white,
      backgroundColor: COLORS.secondary,
    },
    name: {
      color: COLORS.white,
      fontWeight: 'bold',
      marginTop: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      marginHorizontal: 16,
      marginTop: -25,
      borderRadius: 10,
      paddingVertical: 15,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      color: COLORS.textPrimary,
      fontWeight: '600',
    },
    statLabel: {
      color: COLORS.textSecondary,
      marginTop: 4,
    },
    divider: {
      width: 1,
      height: '60%',
      backgroundColor: COLORS.secondary,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      marginTop: 30,
      marginBottom: 5,
    },
    button: {
      flex: 1,
      marginHorizontal: 8,
      borderRadius: 30,
    },
    buttonContent: {
      paddingVertical: 8,
    },
    listSubheader: {
      color: COLORS.textPrimary,
      fontWeight: '600',
      marginTop: 10,
      marginLeft: 16,
    },
    listItem: {
      backgroundColor: COLORS.white,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: COLORS.secondary,
    },
    logoutContainer: {
      paddingHorizontal: 16,
      marginVertical: 20,
    },
    logoutButton: {
      borderRadius: 30,
    },
    iconRight:{
        marginLeft:10
    }
  });