import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  ActivityIndicator 
} from 'react-native';
import { 
  Text, 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  Appbar, 
  Divider, 
  IconButton 
} from 'react-native-paper';
import { COLORS } from '../Colors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';

// Definição do tipo para as receitas favoritas
interface FavoriteRecipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  sourceUrl?: string;
  savedAt: Date;
}

const FavoriteRecipesScreen = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();

  // Simulação do carregamento de dados - normalmente aqui você faria a chamada ao Firestore
  useEffect(() => {
    // Simular o carregamento de dados do Firestore
    setTimeout(() => {
      // Dados de exemplo - na implementação real você buscaria do Firestore
      const mockData: FavoriteRecipe[] = [
        {
          id: '1',
          title: 'Espaguete à Bolonhesa',
          image: 'https://spoonacular.com/recipeImages/1-556x370.jpg',
          readyInMinutes: 45,
          savedAt: new Date()
        },
        {
          id: '2',
          title: 'Moqueca de Peixe',
          image: 'https://spoonacular.com/recipeImages/2-556x370.jpg',
          readyInMinutes: 60,
          savedAt: new Date()
        },
        {
          id: '3',
          title: 'Salada Caesar',
          image: 'https://spoonacular.com/recipeImages/3-556x370.jpg',
          readyInMinutes: 20,
          savedAt: new Date()
        },
        {
          id: '4',
          title: 'Risoto de Cogumelos',
          image: 'https://spoonacular.com/recipeImages/4-556x370.jpg',
          readyInMinutes: 50,
          savedAt: new Date()
        },
      ];
      
      setFavoriteRecipes(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRecipePress = (recipe: FavoriteRecipe) => {
    // Navegação para a tela de detalhes da receita
  };

  const renderRecipeCard = ({ item }: { item: FavoriteRecipe }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleRecipePress(item)}
      activeOpacity={0.8}
    >
      <Card style={styles.card}>
        <Card.Cover 
          source={{ uri: item.image }} 
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
              <Paragraph style={styles.detailText}>{item.readyInMinutes} min</Paragraph>
            </View>
            
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <IconButton
            icon="heart"
            iconColor={COLORS.error}
            size={24}
            onPress={() => {}}
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
      <Text style={styles.emptyText}>Você ainda não tem receitas favoritas</Text>
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={() => {}}
      >
        <Text style={styles.browseButtonText}>Explorar Receitas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction 
          onPress={() => navigation.goBack()} 
          color={COLORS.white}
        />
        <Appbar.Content 
          title="Minhas Receitas Favoritas" 
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action 
          icon="magnify" 
          color={COLORS.white} 
          onPress={() => {}} 
        />
      </Appbar.Header>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando suas receitas favoritas...</Text>
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
    </View>
  );
};

export default FavoriteRecipesScreen;