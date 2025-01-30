import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: COLORS.white,
        marginBottom: 10,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom:10
    },
    activityIndicator:{
        margin:20
    },
    customIndicator: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        padding: 10,
        height:50,
        width:50,
        borderRadius:25
      }
});