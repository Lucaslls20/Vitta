import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white, // Lighter background
        paddingHorizontal: 25, // Slightly more horizontal padding
        paddingTop: 35, // More top padding
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    profileFrame: {
        borderRadius: 100,
        borderWidth: 2, // Slightly thinner border
        borderColor: COLORS.accent,
        padding: 5,
        shadowColor: COLORS.shadowApp,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
    },
    cancelButton: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.error, // fundo vermelho claro
        borderRadius: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 2,
        marginBottom: 20,
        // Sombreamento para profundidade (Android e iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    cancelText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    profilePictureContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75, // Deixa a imagem circular
        backgroundColor: COLORS.secondary, // Caso a imagem não carregue
    },

    input: {
        backgroundColor: COLORS.white,
        borderRadius: 10, // Slightly more rounded
        fontSize: 16,
        height: 52, // Slightly taller
        paddingHorizontal: 5, // More horizontal padding
    },
    saveButton: {
        marginTop: 25, // More top margin
        borderRadius: 10, // Consistent border radius
        shadowColor: COLORS.shadowApp,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.white,
        textAlign: 'center'
    },
    cameraButton: {
        position: 'absolute',
        bottom: -8, // Adjust positioning
        right: -8,
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        padding: 3, // Slightly less padding
        shadowColor: COLORS.shadowApp,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    inputContainer: {
        marginBottom: 25,
        width: '100%',
    },
    label: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
});