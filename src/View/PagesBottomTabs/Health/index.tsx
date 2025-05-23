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
        userAvatar="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D"
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
