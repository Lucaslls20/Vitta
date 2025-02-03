import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Appbar, Card, Title, Paragraph, Chip, Badge, Text, Button } from 'react-native-paper';
import { COLORS } from '../../Colors';
import LinearGradient from 'react-native-linear-gradient';

// Dados simulados
const mockRecipe = {
    title: 'Bolo de Chocolate Fit',
    preparationTime: '40 min',
    glycemicLoad: 'Média',
    ingredients: [
        '2 xícaras de farinha de aveia',
        '3 ovos',
        '1 xícara de cacau em pó 100%',
        '1/2 xícara de óleo de coco',
        '1 xícara de açúcar demerara',
        '1 colher de sopa de fermento'
    ],
    preparationSteps: [
        'Pré-aqueça o forno a 180°C',
        'Misture todos os ingredientes secos em uma tigela',
        'Adicione os ingredientes líquidos e misture bem',
        'Despeje a massa em forma untada',
        'Asse por 30-35 minutos',
        'Deixe esfriar antes de servir'
    ],
    imageUrl: 'https://i.panelinha.com.br/i1/bk-9097-39-panelinha-12-02-200635.webp'
};

const SeeDetails = () => {
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.shadow]}
                    style={styles.gradientHeader}
                >
                    <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => { }} color={COLORS.white} />
                        <Appbar.Content title="Detalhes da Receita" titleStyle={styles.headerTitle} />
                    </Appbar.Header>
                </LinearGradient>
            </View>

            <ScrollView>
                {/* Imagem da receita */}
                <Image
                    source={{ uri: mockRecipe.imageUrl }}
                    style={styles.recipeImage}
                    resizeMode="cover"
                />

                {/* Cabeçalho com informações principais */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>{mockRecipe.title}</Title>
                        <View style={styles.infoContainer}>
                            <Chip icon="clock-outline" style={styles.chip}>
                                <Text style={styles.textChip}>{mockRecipe.preparationTime}</Text>
                            </Chip>
                            <Chip
                                icon="nutrition"
                                style={[styles.chip, styles.glycemicChip]}
                                textStyle={styles.chipText}
                            >
                                Carga Glicêmica: {mockRecipe.glycemicLoad}
                            </Chip>
                        </View>
                    </Card.Content>
                </Card>

                {/* Seção de Ingredientes */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.sectionTitle}>Ingredientes</Title>
                        {mockRecipe.ingredients.map((ingredient, index) => (
                            <Paragraph key={index} style={styles.listItem}>
                                • {ingredient}
                            </Paragraph>
                        ))}
                    </Card.Content>
                </Card>

                {/* Seção de Modo de Preparo */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.sectionTitle}>Modo de Preparo</Title>
                        {mockRecipe.preparationSteps.map((step, index) => (
                            <Paragraph key={index} style={styles.listItem}>
                                {index + 1}. {step}
                            </Paragraph>
                        ))}
                    </Card.Content>
                </Card>
                <Button
                    mode='contained'
                    style={[styles.button, styles.buttonDisabled]}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}>
                    Favorite Recipe
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        marginHorizontal:5,
        marginVertical:8
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
});

export default SeeDetails;