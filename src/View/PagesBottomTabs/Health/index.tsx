import React, { useState, useEffect } from 'react';
import { RecipesViewModel } from '../../../ViewModels/HealthViewModel';
import { Recipe } from '../../../Models/HealthModel';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';
import { Header } from '../../../Components/Health/Header';
import { SearchBar } from '../../../Components/Health/SearchBar';
import { LoadingIndicator } from '../../../Components/Health/LoadingIndicator';
import { RecipeSection } from '../../../Components/Health/RecipeSection';

export default function Health() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewModel] = useState(new RecipesViewModel());

  useEffect(() => {
    const checkDataLoaded = () => {
      // Considere os dados carregados se pelo menos uma refeição possuir receitas
      if (
        viewModel.breakfastRecipes.length > 0 ||
        viewModel.lunchRecipes.length > 0 ||
        viewModel.dinnerRecipes.length > 0
      ) {
        setIsLoading(false);
      } else {
        setTimeout(checkDataLoaded, 500);
      }
    };
    checkDataLoaded();
  }, []);

  const filterRecipes = (recipes: Recipe[]) =>
    recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const filteredBreakfast = filterRecipes(viewModel.breakfastRecipes);
  const filteredLunch = filterRecipes(viewModel.lunchRecipes);
  const filteredDinner = filterRecipes(viewModel.dinnerRecipes);

  const hasAnyRecipe =
    filteredBreakfast.length > 0 ||
    filteredLunch.length > 0 ||
    filteredDinner.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName="João Silva"
        userAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {!hasAnyRecipe ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              Nenhuma receita encontrada para as refeições. Por favor, tente
              novamente mais tarde!
            </Text>
          </View>
        ) : (
          <>
            <RecipeSection title="Breakfast" data={filteredBreakfast} />
            <RecipeSection title="Lunch" data={filteredLunch} />
            <RecipeSection title="Dinner" data={filteredDinner} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
