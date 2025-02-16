import React, { useState, useEffect } from 'react';
import { RecipesViewModel } from '../../../ViewModels/HealthViewModel';
import { Recipe } from '../../../Models/HealthModel';
import { SafeAreaView, ScrollView } from 'react-native';
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
      if (
        viewModel.breakfastRecipes.length > 0 &&
        viewModel.lunchRecipes.length > 0 &&
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

  return (
    <SafeAreaView style={styles.container}>
      <Header userName="João Silva" userAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <RecipeSection
          title="Breakfast"
          data={filterRecipes(viewModel.breakfastRecipes)}
        />
        <RecipeSection
          title="Lunch"
          data={filterRecipes(viewModel.lunchRecipes)}
        />
        <RecipeSection
          title="Dinner"
          data={filterRecipes(viewModel.dinnerRecipes)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}