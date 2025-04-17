import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { 
  Button, 
  Card, 
  Title, 
  Paragraph, 
  Text, 
  Chip, 
  ProgressBar, 
  Divider,
  Avatar,
  FAB,
  Portal,
  Dialog,
  IconButton,
  Surface
} from 'react-native-paper';
import { COLORS } from '../Colors';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';

// Mock Data
const MOCK_RECIPES = [
  {
    id: 1001,
    title: "Kale and Quinoa Salad with Lemon Vinaigrette",
    image: "https://spoonacular.com/recipeImages/833951-556x370.jpg",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 4,
    healthScore: 92
  },
  {
    id: 1002,
    title: "Grilled Salmon with Avocado Salsa",
    image: "https://spoonacular.com/recipeImages/645306-556x370.jpg",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 2,
    healthScore: 88
  },
  {
    id: 1003,
    title: "Mediterranean Chickpea Power Bowl",
    image: "https://spoonacular.com/recipeImages/715540-556x370.jpg",
    imageType: "jpg",
    readyInMinutes: 20,
    servings: 3,
    healthScore: 94
  },
  {
    id: 1004,
    title: "Overnight Oats with Berries and Nuts",
    image: "https://spoonacular.com/recipeImages/657095-556x370.jpg",
    imageType: "jpg",
    readyInMinutes: 10,
    servings: 1,
    healthScore: 85
  },
  {
    id: 1005,
    title: "Sweet Potato and Black Bean Chili",
    image: "https://spoonacular.com/recipeImages/715424-556x370.jpg",
    imageType: "jpg",
    readyInMinutes: 45,
    servings: 6,
    healthScore: 90
  },
  {
    id: 1006,
    title: "Cauliflower Fried Rice with Tofu",
    image: "https://spoonacular.com/recipeImages/716195-556x370.jpg",
    imageType: "jpg",
    readyInMinutes: 35,
    servings: 4,
    healthScore: 86
  }
];

const MOCK_FEATURED_RECIPE = {
  id: 9999,
  title: "Superfood Breakfast Bowl Challenge",
  image: "https://spoonacular.com/recipeImages/659135-556x370.jpg",
  imageType: "jpg",
  readyInMinutes: 15,
  servings: 2,
  healthScore: 95
};

// Types
interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
  healthScore?: number;
  readyInMinutes?: number;
  servings?: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  daysToComplete: number;
  currentDay?: number;
  progress: number;
  status: 'pending' | 'completed' | 'overdue' | 'active';
  icon?: string;
  reward?: string;
  participants?: number;
  recipeId?: number;
  recipeImage?: string;
  nutritionFocus?: string;
}

const ChallengesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      loadMockData();
      setLoading(false);
    }, 1500);
  }, []);

  const loadMockData = () => {
    setRandomRecipes(MOCK_RECIPES);
    setFeaturedRecipe(MOCK_FEATURED_RECIPE);
    
    // Create challenges based on mock recipes
    const newChallenges = MOCK_RECIPES.map((recipe: Recipe, index: number) => {
      const categories = ['Nutrition', 'Healthy Eating', 'Weight Loss', 'Clean Eating', 'Meal Prep', 'Vegan'];
      const difficulties = ['beginner', 'intermediate', 'advanced'] as const;
      const statuses = ['pending', 'active', 'completed', 'active', 'active', 'pending'] as const;
      const icons = ['food-apple', 'food', 'food-variant', 'pasta', 'fruit-watermelon', 'food-fork-drink'];
      const nutritionFocus = ['Protein', 'Low Carb', 'Low Fat', 'High Fiber', 'Low Sugar', 'Balanced'];
      
      // Determine progress based on status
      let progress = 0;
      if (statuses[index] === 'completed') {
        progress = 1.0;
      } else if (statuses[index] === 'active') {
        progress = Math.random() * 0.8 + 0.1; // Random progress between 10% and 90%
      }
      
      // Days calculation
      const daysToComplete = Math.floor(Math.random() * 20) + 7; // 7 to 27 days
      const currentDay = statuses[index] === 'completed' 
        ? daysToComplete 
        : statuses[index] === 'active' 
            ? Math.floor(progress * daysToComplete) 
            : 0;
            
      return {
        id: (index + 1).toString(),
        title: `${recipe.title.substring(0, 30)}${recipe.title.length > 30 ? '...' : ''}`,
        description: `Follow this ${recipe.readyInMinutes} minute recipe ${Math.floor(daysToComplete/7)} times per week for ${Math.ceil(daysToComplete/7)} weeks`,
        category: categories[index % categories.length],
        difficulty: difficulties[index % difficulties.length],
        daysToComplete,
        currentDay,
        progress,
        status: statuses[index],
        icon: icons[index % icons.length],
        reward: `${(index + 1) * 100} points`,
        participants: Math.floor(Math.random() * 1000) + 100,
        recipeId: recipe.id,
        recipeImage: recipe.image,
        nutritionFocus: nutritionFocus[index % nutritionFocus.length]
      };
    });
    
    setChallenges(newChallenges);
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return challenge.status === 'active' || challenge.status === 'pending';
    if (activeTab === 'completed') return challenge.status === 'completed';
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return COLORS.success;
      case 'intermediate':
        return COLORS.today;
      case 'advanced':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return COLORS.status.pending;
      case 'completed':
        return COLORS.status.completed;
      case 'active':
        return COLORS.primary;
      case 'overdue':
        return COLORS.status.overdue;
      default:
        return COLORS.textSecondary;
    }
  };

  const renderChallengeItem = ({ item }: { item: Challenge }) => (
    <Card style={styles.challengeCard}>
      {item.recipeImage && (
        <Card.Cover 
          source={{ uri: item.recipeImage }} 
          style={styles.recipeCover}
        />
      )}
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <Avatar.Icon 
              size={40} 
              icon={item.icon || 'food'} 
              color={COLORS.white} 
              style={{ backgroundColor: COLORS.primary }} 
            />
            <Title style={styles.title}>{item.title}</Title>
          </View>
          <Chip 
            style={{ backgroundColor: getDifficultyColor(item.difficulty) + '20' }}
            textStyle={{ color: getDifficultyColor(item.difficulty) }}
          >
            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
          </Chip>
        </View>
        
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        
        <View style={styles.challengeInfo}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.daysText}>
            {item.status === 'completed' 
              ? 'Completed' 
              : `Day ${item.currentDay || 0}/${item.daysToComplete}`}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={item.progress} 
            color={item.status === 'completed' ? COLORS.status.completed : COLORS.primary} 
            style={styles.progressBar} 
          />
          <Text style={styles.progressText}>{Math.round(item.progress * 100)}%</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{item.reward}</Text>
            <Text style={styles.statLabel}>Reward</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{item.nutritionFocus}</Text>
            <Text style={styles.statLabel}>Focus</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {item.status === 'completed' 
                ? 'Complete' 
                : item.status === 'pending'
                  ? 'Not Started'
                  : 'In Progress'
              }
            </Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.cardActions}>
        {item.status === 'pending' && (
          <Button 
            mode="contained" 
            onPress={() => {}} 
            style={styles.joinButton}
            labelStyle={styles.buttonLabel}
          >
            Join Challenge
          </Button>
        )}
        {item.status === 'active' && (
          <Button 
            mode="contained" 
            onPress={() => {}} 
            style={styles.trackButton}
            labelStyle={styles.buttonLabel}  
          >
            Track Progress
          </Button>
        )}
        {item.status === 'completed' && (
          <Button 
            mode="outlined" 
            onPress={() => {}} 
            style={styles.completedButton}
            labelStyle={{ color: COLORS.status.completed }}
          >
            View Results
          </Button>
        )}
        <IconButton 
          icon="chef-hat" 
          size={24} 
          iconColor={COLORS.textSecondary} 
          onPress={() => {}}
        />
        <IconButton 
          icon="dots-vertical" 
          size={24} 
          iconColor={COLORS.textSecondary} 
          onPress={() => {}}
        />
      </Card.Actions>
    </Card>
  );

  const renderHeaderComponent = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='arrow-back-ios' size={25} color={COLORS.primary}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nutrition Challenges</Text>
        <IconButton 
          icon="bell-outline" 
          size={24} 
          iconColor={COLORS.textPrimary} 
          onPress={() => {}}
        />
      </View>
      
      {featuredRecipe ? (
        <Surface style={styles.featuredChallenge}>
          <Image 
            source={{ uri: featuredRecipe.image }} 
            style={styles.featuredImage}
          />
          <View style={styles.featuredContent}>
            <View style={styles.featuredOverlay}>
              <Title style={styles.featuredTitle}>
                {featuredRecipe.title.length > 30 
                  ? featuredRecipe.title.substring(0, 30) + '...' 
                  : featuredRecipe.title}
              </Title>
              <Text style={styles.featuredSubtitle}>
                {featuredRecipe.healthScore 
                  ? `Health Score: ${featuredRecipe.healthScore} • ` 
                  : ''}
                {featuredRecipe.readyInMinutes 
                  ? `${featuredRecipe.readyInMinutes} min • ` 
                  : ''}
                {featuredRecipe.servings 
                  ? `${featuredRecipe.servings} servings` 
                  : ''}
              </Text>
              <Button 
                mode="contained" 
                onPress={() => {}} 
                style={styles.featuredButton}
                labelStyle={styles.buttonLabel}
                icon="food-fork-drink"
              >
                Start Challenge
              </Button>
            </View>
          </View>
        </Surface>
      ) : (
        <Surface style={[styles.featuredChallenge, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Surface>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.resultCount}>
          {filteredChallenges.length} {filteredChallenges.length === 1 ? 'Challenge' : 'Challenges'}
        </Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.filterText}>Filter</Text>
          <IconButton icon="filter-variant" size={20} iconColor={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Avatar.Icon 
        size={80} 
        icon="food-off" 
        color={COLORS.white} 
        style={{ backgroundColor: COLORS.gray }} 
      />
      <Title style={styles.emptyTitle}>No Challenges Found</Title>
      <Paragraph style={styles.emptyText}>Try adjusting your filters or create a new challenge</Paragraph>
      <Button 
        mode="contained" 
        onPress={() => setShowDialog(true)} 
        style={{ backgroundColor: COLORS.primary, marginTop: 16 }}
        icon="plus"
      >
        Create Challenge
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading nutrition challenges...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredChallenges}
          renderItem={renderChallengeItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeaderComponent}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
      
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Create Nutrition Challenge</Dialog.Title>
          <Dialog.Content>
            <Text>Create a custom nutrition challenge from our recipe collection.</Text>
            <View style={styles.dialogSection}>
              <Text style={styles.dialogLabel}>Recipe Search</Text>
              <Text style={styles.dialogDescription}>
                Search for recipes to turn into challenges or create your own custom challenge.
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancel</Button>
            <Button 
              onPress={() => setShowDialog(false)}
              mode="contained"
              style={{ backgroundColor: COLORS.primary }}
            >
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
      <FAB
        style={styles.fab}
        icon="plus"
        color={COLORS.white}
        onPress={() => setShowDialog(true)}
      />
    </SafeAreaView>
  );
};


export default ChallengesScreen;