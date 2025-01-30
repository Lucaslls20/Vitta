// styles.ts
import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    header: {
        flex: 2,
        justifyContent: "center",
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
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 15,
    },
    subtitle: {
        textAlign: "center",
        color: COLORS.textSecondary,
        fontSize: 14,
        marginBottom: 20,
    },
    form: {
        flex: 3,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        paddingVertical: 30,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginVertical: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttonDisabled: {
        opacity: 0.8,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.white,
    },
    buttonContent: {
        paddingVertical: 10,
    },
    footerText: {
        textAlign: "center",
        color: COLORS.textSecondary,
        marginTop: 10,
    },
    loginLink: {
        color: COLORS.primary,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});