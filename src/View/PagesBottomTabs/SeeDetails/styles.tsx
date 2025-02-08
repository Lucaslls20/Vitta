import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        overflow: 'hidden',
        elevation: 6,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginHorizontal: 5,
        marginVertical: 8
    },
    gradientHeader: {
        paddingBottom: 10,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    header: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'justify',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    recipeImage: {
        height: 250,
        width: '100%',
        marginBottom: 5
    },
    card: {
        margin: 10,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: COLORS.secondary
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.textPrimary,
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    chip: {
        marginVertical: 4,
        backgroundColor: COLORS.primary,
    },
    glycemicChip: {
        backgroundColor: COLORS.primary,
    },
    chipText: {
        color: COLORS.white,
    },
    textChip: {
        color: COLORS.white
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.textPrimary,
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        lineHeight: 24,
        color: COLORS.textSecondary,
        marginVertical: 4,
        fontWeight: '500'
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
        width: '90%',
        alignSelf: 'center'
    },
    buttonDisabled: {
        opacity:0.9
    },
    buttonContent: {
        height: 48,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.white,
    },
});
