import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { 
  Text, 
  Card, 
  Title, 
  Paragraph, 
  Appbar, 
  IconButton, 
  Snackbar 
} from 'react-native-paper';
import { COLORS } from '../Colors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';
import { useFavoritesViewModel } from '../../ViewModels/FavoritesRecipesViewModel';
import { FavoriteRecipe } from '../../Models/FavoriteRecipeModel';

const FavoriteRecipesScreen = () => {
  const { favoriteRecipes, loading, error, removeFavorite } = useFavoritesViewModel();
  const navigation = useNavigation<NavigationProps>();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRecipePress = (recipe: FavoriteRecipe) => {
    if (navigation && navigation.navigate) {
      navigation.navigate('SeeDetails', { recipeId: recipe.recipeId });
    } else {
      console.error('Navigation is not configured correctly.');
    }
  };

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
    setSnackbarMessage('Recipe removed from favorites!');
    setSnackbarVisible(true);
  };

  const renderRecipeCard = ({ item }: { item: FavoriteRecipe }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleRecipePress(item)}
      activeOpacity={0.8}
    >
      <Card style={styles.card}>
        <Card.Cover 
          source={{ uri: item.imageUrl }} 
          style={styles.cardImage}
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.recipeTitle}>{item.title}</Title>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <IconButton
                icon="clock-outline"
                size={16}
                iconColor={COLORS.textSecondary}
                style={styles.icon}
              />
              <Paragraph style={styles.detailText}>{item.preparationTime}</Paragraph>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <IconButton
            icon="heart-outline" // Ícone de coração vazio
            iconColor={COLORS.error}
            size={24}
            onPress={() => handleRemoveFavorite(item.id)}
            style={styles.favoriteIcon}
          />
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <IconButton
        icon="food-variant-off"
        size={64}
        iconColor={COLORS.gray}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyText}>
        {error ? error : "You don't have any favorite recipes yet"}
      </Text>
      {error && (
        <TouchableOpacity 
          style={styles.browseButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.browseButtonText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction 
          onPress={() => navigation.goBack()} 
          color={COLORS.white}
        />
        <Appbar.Content 
          title="My Favorites Recipes" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your favorite recipes...</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {/* Snackbar para feedback */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
        action={{
          label: 'Close',
          onPress: () => setSnackbarVisible(false),
           textColor:COLORS.white
        }}
      >
        <Text style={styles.snackBarText}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};

export default FavoriteRecipesScreen;