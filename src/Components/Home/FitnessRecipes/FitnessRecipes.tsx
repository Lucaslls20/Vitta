import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Button, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useRecipeViewModel } from '../../../ViewModels/HomeViewModelSpoonacular';
import { Recipe } from '../../../Models/HomeModelSpoonacular';
import { COLORS } from '../../../View/Colors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../App';

interface FitnessRecipesProps {
  diet: string; 
}

const FitnessRecipes: React.FC<FitnessRecipesProps> = ({ diet }) => {
  const { recipes, loading, error, refresh } = useRecipeViewModel(diet);
  const navigation = useNavigation<NavigationProps>()

  const renderItem = ({ item }: { item: Recipe }) => (
    <Card style={styles.card} elevation={4}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.secondary]} 
        style={styles.gradient}
      >
        <Card.Cover source={{ uri: item.image }} style={styles.image} />
        <Card.Content style={styles.content}>
          <Title style={styles.title}>{item.title}</Title>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('SeeDetails', { recipeId: item.id })}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={{backgroundColor:COLORS.primary}}
          >
          See Details
          </Button>
        </Card.Actions>
      </LinearGradient>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando receitas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="outlined" onPress={refresh}>
          Tentar Novamente
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};


export default FitnessRecipes;
