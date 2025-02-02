import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { ActivityIndicator, Text, Card, Button, TextInput, Avatar, Chip } from 'react-native-paper';
import { styles } from './styles';
import { calendarTheme } from './calendarTheme';
import { useHomeViewModel } from '../../../ViewModels/HomeViewModelNutritionix';
import { COLORS } from '../../Colors';
import { Calendar } from 'react-native-calendars';
import FitnessRecipes from '../../../Components/Home/FitnessRecipes/FitnessRecipes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderNutritionCard from '../../../Components/Home/renderNutricionCard/renderNutritionCard';

export const Home: React.FC = () => {
  const { nutrition, loading, error, fetchNutritionData, dailySummary, setError } = useHomeViewModel();
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = () => {
    if (query.trim().length > 0) {
      fetchNutritionData(query);
    } else {
      // Feedback visual para campo vazio
      setError('Por favor, digite um alimento para pesquisar');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header melhorado */}
        <View style={styles.header}>
          <Avatar.Icon
            icon="account"
            size={56}
            style={styles.userAvatar}
            theme={{ colors: { primary: COLORS.primary } }}
          />
          <View>
            <Text style={styles.greeting}>Bem-vindo, João! 👋</Text>
            <View style={styles.caloriesContainer}>
              <Icon name="fire" size={16} color={COLORS.primary} />
              <Text style={styles.subGreeting}>
                Consumo hoje: {dailySummary?.calories || 0} kcal
              </Text>
            </View>
          </View>
        </View>

        {/* Calendário com tema aprimorado */}
        <Calendar
          style={styles.calendar}
          onDayPress={(day: any) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: COLORS.primary,
              selectedTextColor: COLORS.white,
            },
            ...dailySummary?.markedDates,
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

        {/* Campo de busca aprimorado */}
        <View style={styles.searchContainer}>
          <TextInput
            mode="outlined"
            label="O que você comeu hoje?"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            outlineColor={COLORS.primary}
            activeOutlineColor={COLORS.primary}
            right={
              <TextInput.Icon
                icon="magnify"
                color={COLORS.primary}
                onPress={handleSearch}
              />
            }
            onSubmitEditing={handleSearch}
            placeholder="Ex: 1 xícara de arroz integral"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        {/* Estados melhorados */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              animating={true}
              color={COLORS.primary}
              size="large"
            />
            <Text style={styles.loadingText}>Analisando valores nutricionais...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={40} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : nutrition ? (
         <RenderNutritionCard/>
        ) : (
          <View style={styles.emptyState}>
            <Image
              source={{uri:'https://previews.123rf.com/images/chudtsankov/chudtsankov1503/chudtsankov150300085/37831875-happy-hamburger-cartoon-character-waving-illustration-isolated-on-white.jpg'}}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              Vamos começar!{'\n'}
              <Text style={styles.emptySubtext}>
                Pesquise um alimento para ver suas informações nutricionais
              </Text>
            </Text>
          </View>
        )}
        <Text style={styles.text}>Receitas nutritivas para você :</Text>
        <FitnessRecipes/>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home