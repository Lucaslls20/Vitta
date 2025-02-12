import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { calendarTheme } from './calendarTheme';
import { useHomeViewModel } from '../../../ViewModels/HomeViewModelNutritionix';
import { COLORS } from '../../Colors';
import { Calendar } from 'react-native-calendars';
import FitnessRecipes from '../../../Components/Home/FitnessRecipes/FitnessRecipes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderNutritionCard from '../../../Components/Home/renderNutricionCard/renderNutritionCard';
import UserGreeting from '../../../Components/Home/UserGreeting';

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

        {/* Calendário */}
        <Calendar
  style={styles.calendar}
  onDayPress={(day: any) => setSelectedDate(day.dateString)}
  markedDates={{
    [selectedDate]: {
      selected: true,
      selectedColor: COLORS.primary,
      selectedTextColor: COLORS.white,
    },
    ...Object.keys(dailySummary?.dailyCalories || {}).reduce((acc, date) => ({
      ...acc,
      [date]: { marked: true, dotColor: COLORS.primary }
    }), {}),
    [new Date().toISOString().split('T')[0]]: {
      customStyles: {
        container: {
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.primary,
          borderWidth: 1,
        },
        text: {
          color: COLORS.primary,
        },
      },
    },
  }}
  theme={calendarTheme}
/>
        {/* Barra de busca */}
        <View style={styles.searchContainer}>
          <TextInput
            mode="outlined"
            label="What did you eat today?"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            outlineColor={COLORS.primary}
            activeOutlineColor={COLORS.primary}
            right={<TextInput.Icon icon="magnify" color={COLORS.primary} onPress={handleSearch} />}
            onSubmitEditing={handleSearch}
            placeholder="Ex: 1 cup of brown rice"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        {/* Estados */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
            <Text style={styles.loadingText}>Analyzing nutritional values...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={40} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : nutrition ? (
          <RenderNutritionCard nutrition={nutrition} />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
            Let's get started!{'\n'}
              <Text style={styles.emptySubtext}>
              Search for a food to see its nutritional information
              </Text>
            </Text>
          </View>
        )}

        {/* Seções de Receitas */}
        <Text style={styles.text}>Vegetarian Recipes:</Text>
        <FitnessRecipes diet="vegetarian" />
        
        <Text style={styles.text}>Recipes that contain Fish:</Text>
        <FitnessRecipes diet="pescetarian" />
        
        <Text style={styles.text}>Gluten-Free Recipes:</Text>
        <FitnessRecipes diet="glutenFree" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
