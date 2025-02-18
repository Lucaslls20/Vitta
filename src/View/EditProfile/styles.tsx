import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 40, // para afastar do topo
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
        borderWidth: 3,
        borderColor: COLORS.accent,
        padding: 4,
        shadowColor: COLORS.textPrimary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    cancelButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    cancelText: {
        color: '#D32F2F',
        fontSize: 16,
    },
    profilePictureContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50, // Deixa a imagem circular
        backgroundColor: COLORS.secondary, // Caso a imagem não carregue
    },

    input: {
        marginBottom: 16,
        backgroundColor: COLORS.secondary,
        borderRadius: 8,
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 4,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
    },
});