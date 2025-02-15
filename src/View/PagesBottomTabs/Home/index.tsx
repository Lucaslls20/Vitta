import React, { useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useHomeViewModel } from '../../../ViewModels/HomeViewModelNutritionix';
import { styles } from './styles';
import {UserGreeting} from '../../../Components/Home/UserGreeting';
import { NutritionStatus } from '../../../Components/Home/NutritionStatus';
import { SearchFoodInput } from '../../../Components/Home/SearchFoodInput';
import { NutritionCalendar } from '../../../Components/Home/NutritionCalendar';
import { RecipeSection } from '../../../Components/Home/RecipeSection';

export const Home: React.FC = () => {
  const { nutrition, loading, error, fetchNutritionData, dailySummary, setError } = useHomeViewModel();
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = () => {
    if (query.trim().length > 0) {
      fetchNutritionData(query);
    } else {
      setError('Please enter a food to search');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <UserGreeting dailySummary={dailySummary}/>
        
        <NutritionCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          dailySummary={dailySummary}
        />

        <SearchFoodInput
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />

        <NutritionStatus
          loading={loading}
          error={error}
          nutrition={nutrition}
        />

        <RecipeSection title="Vegetarian Recipes:" diet="vegetarian" />
        <RecipeSection title="Recipes that contain Fish:" diet="pescetarian" />
        <RecipeSection title="Gluten-Free Recipes:" diet="glutenFree" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;