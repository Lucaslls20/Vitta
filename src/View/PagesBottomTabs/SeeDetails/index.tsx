import React from 'react';
import { ScrollView, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Appbar, Card, Title, Paragraph, Chip, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useRecipeDetailsViewModel } from '../../../ViewModels/RecipeDetailsViewModel';
import { SeeDetailsRouteProp } from '../../../App';
import { styles } from './styles';

const SeeDetails = ({ route }: { route: SeeDetailsRouteProp }) => {
    const { recipeId } = route.params;
    const { recipeDetails, loading, error } = useRecipeDetailsViewModel(recipeId);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.shadow]}
                    style={styles.gradientHeader}
                >
                    <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} color={COLORS.white} />
                        <Appbar.Content title="Recipe Details" titleStyle={styles.headerTitle} />
                    </Appbar.Header>
                </LinearGradient>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
                        Voltar
                    </Button>
                </View>
            ) : (
                <ScrollView>
                    <Image
                        source={{ uri: recipeDetails?.imageUrl }}
                        style={styles.recipeImage}
                        resizeMode="cover"
                    />

                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={styles.title}>{recipeDetails?.title}</Title>
                            <View style={styles.infoContainer}>
                                <Chip icon="clock-outline" style={styles.chip}>
                                    <Text style={styles.textChip}>{recipeDetails?.preparationTime}</Text>
                                </Chip>
                                <Chip
                                    icon="nutrition"
                                    style={[styles.chip, styles.glycemicChip]}
                                    textStyle={styles.chipText}
                                >
                                    Carga Glicêmica: {recipeDetails?.glycemicLoad}
                                </Chip>
                            </View>
                        </Card.Content>
                    </Card>

                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={styles.sectionTitle}>Ingredientes</Title>
                            {recipeDetails?.ingredients.map((ingredient, index) => (
                                <Paragraph key={index} style={styles.listItem}>
                                    • {ingredient}
                                </Paragraph>
                            ))}
                        </Card.Content>
                    </Card>

                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={styles.sectionTitle}>Modo de Preparo</Title>
                            {recipeDetails?.preparationSteps.map((step, index) => (
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
                        onPress={() => console.log('Oi')}
                        labelStyle={styles.buttonLabel}>
                        Favorite Recipe
                    </Button>
                </ScrollView>
            )}
        </View>
    );
};

export default SeeDetails;
