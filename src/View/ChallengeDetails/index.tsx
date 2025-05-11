import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Text, Title, Paragraph, Chip, Button, Surface } from 'react-native-paper';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { COLORS } from '../Colors';
import { fetchRecipeDetails } from '../../Services/spoonacularService';
import {Recipe} from '../../Models/ChallengesModel';

// Define navigation param types
type RootStackParamList = {
  ChallengeDetails: { id: string; recipeId: number };
};

type ChallengeDetailsRouteProp = RouteProp<RootStackParamList, 'ChallengeDetails'>;

const ChallengeDetails: React.FC = () => {
  const route = useRoute<ChallengeDetailsRouteProp>();
  const navigation = useNavigation();
  const { recipeId, id } = route.params;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({ title: 'Challenge Details' });
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipeDetails(recipeId);
        setRecipe(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.center}>
        <Paragraph>Error loading details: {error}</Paragraph>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Surface style={styles.headerSurface}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
      </Surface>
      <Title style={styles.title}>{recipe.title}</Title>
      {recipe.readyInMinutes && (
        <Chip style={styles.chip}>Ready in {recipe.readyInMinutes} min</Chip>
      )}
      {recipe.servings && (
        <Chip style={styles.chip}>Servings: {recipe.servings}</Chip>
      )}
      {recipe.summary && (
        <Paragraph style={styles.paragraph}>
          {/* Warning: summary may contain HTML tags, strip if necessary */}
          {recipe.summary.replace(/<[^>]+>/g, '')}
        </Paragraph>
      )}
      {recipe.nutrition?.nutrients && (
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Nutrients</Title>
          {recipe.nutrition.nutrients.map((nutrient, idx) => (
            <View key={idx} style={styles.nutrientRow}>
              <Text style={styles.nutrientName}>{nutrient.name}</Text>
              <Text style={styles.nutrientValue}>
                {nutrient.amount} {nutrient.unit}
              </Text>
            </View>
          ))}
        </View>
      )}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        Back to Challenges
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerSurface: { elevation: 2, borderRadius: 8, overflow: 'hidden', marginBottom: 16 },
  image: { width: '100%', height: 200 },
  title: { fontSize: 24, marginBottom: 8 },
  chip: { marginRight: 8, marginBottom: 8 },
  paragraph: { marginBottom: 16, lineHeight: 20 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, marginBottom: 8 },
  nutrientRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  nutrientName: { fontSize: 16 },
  nutrientValue: { fontSize: 16, fontWeight: 'bold' },
  button: { marginTop: 24, backgroundColor: COLORS.primary },
});

export default ChallengeDetails;
