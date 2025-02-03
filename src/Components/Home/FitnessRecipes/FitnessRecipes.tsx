import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Button, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useRecipeViewModel } from '../../../ViewModels/HomeViewModelSpoonacular';
import { Recipe } from '../../../Models/HomeModelSpoonacular';
import { COLORS } from '../../../View/Colors';
import { styles } from './styles';

interface FitnessRecipesProps {
  diet: string; 
}


const FitnessRecipes: React.FC<FitnessRecipesProps> = ({ diet }) => {
  const { recipes, loading, error, refresh } = useRecipeViewModel(diet);

  const renderItem = ({ item }: { item: Recipe }) => (
    <Card style={styles.card} elevation={4}>
      {/* Utilizamos o LinearGradient como background do Card */}
      <LinearGradient
        colors={[COLORS.secondary, COLORS.secondary]} // Defina as cores do gradiente conforme sua paleta
        style={styles.gradient}
      >
        <Card.Cover source={{ uri: item.image }} style={styles.image} />
        <Card.Content style={styles.content}>
          <Title style={styles.title}>{item.title}</Title>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => {
              // Aqui você pode implementar a navegação ou a ação desejada para ver a receita
              console.log(`See Details ${item.id}`);
            }}
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
