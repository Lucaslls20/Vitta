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
        fontSize: 24,
        textAlign: "center",
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 30,
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
        marginBottom: 20,
        backgroundColor: COLORS.white,
    },
    button: {
        marginVertical: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        elevation: 6,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonDisabled: {
        opacity: 0.8,
    },
    buttonContent: {
        height: 48,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.white,
    },
    footerText: {
        textAlign: "center",
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 20,
    },
    loginLink: {
        color: COLORS.primary,
        fontWeight: "700",
        textDecorationLine: "underline",
    },
    forgotPassword: {
        textAlign: "right",
        color: COLORS.textSecondary,
        marginBottom: 15,
        fontSize: 14,
    },
    forgotPasswordClick: {
        color: COLORS.primary,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});