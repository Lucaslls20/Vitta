import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  Chip,
  ProgressBar,
  Avatar,
  FAB,
  Portal,
  Dialog,
  IconButton,
  Surface,
} from 'react-native-paper';
import {COLORS} from '../Colors';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../App';
import {Recipe, Challenge} from '../../Models/ChallengesModel';
import useChallengesViewModel from '../../ViewModels/ChallengesViewModel';
import {auth} from '../../Services/firebaseConfig';
import Modal from 'react-native-modal';

const ChallengesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>(
    'all',
  );
  const [showDialog, setShowDialog] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );

  const userId = auth.currentUser?.uid ?? '';

  const {
    loading,
    featuredRecipe,
    challenges,
    fetchData,
    handleJoinChallenge,
    handleTrackProgress,
    handleViewResults,
    handleChefHatAction,
    handleMoreOptions,
  } = useChallengesViewModel();

  const filteredChallenges = challenges.filter(challenge => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return challenge.status === 'active';
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

  const renderChallengeItem = ({item}: {item: Challenge}) => (
    <Card style={styles.challengeCard}>
      {item.recipeImage && (
        <Card.Cover
          source={{uri: item.recipeImage}}
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
              style={{backgroundColor: COLORS.primary}}
            />
            <Title style={styles.title}>{item.title}</Title>
          </View>
          <Chip
            style={{
              backgroundColor: getDifficultyColor(item.difficulty) + '20',
            }}
            textStyle={{color: getDifficultyColor(item.difficulty)}}>
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
            color={
              item.status === 'completed'
                ? COLORS.status.completed
                : COLORS.primary
            }
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {Math.round(item.progress * 100)}%
          </Text>
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
                : 'In Progress'}
            </Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
      </Card.Content>

      <Card.Actions style={styles.cardActions}>
        {item.status === 'pending' && (
          <Button
            mode="contained"
            onPress={() => handleJoinChallenge(item, userId)}
            style={styles.joinButton}
            labelStyle={styles.buttonLabel}>
            Join Challenge
          </Button>
        )}
        {item.status === 'active' && (
          <Button
            mode="contained"
            onPress={() => handleTrackProgress(item, userId)}
            style={styles.trackButton}
            labelStyle={styles.buttonLabel}>
            Track Progress
          </Button>
        )}
        {item.status === 'completed' && (
          <Button
            mode="outlined"
            onPress={() => handleViewResults(item, userId)}
            style={styles.completedButton}
            labelStyle={{color: COLORS.status.completed}}>
            View Results
          </Button>
        )}
        <IconButton
          icon="dots-vertical"
          size={24}
          iconColor={COLORS.textSecondary}
          onPress={() => {
            setSelectedChallenge(item);
            setIsModalVisible(true);
          }}
        />
      </Card.Actions>
    </Card>
  );

  const renderHeaderComponent = ({item}: {item: Challenge}) => (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backAction}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={25} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nutrition Challenges</Text>
      </View>

      {featuredRecipe ? (
        <Surface style={styles.featuredChallenge}>
          <Image
            source={{uri: featuredRecipe.image}}
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
                icon="food-fork-drink">
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
          onPress={() => setActiveTab('all')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.resultCount}>
          {filteredChallenges.length}{' '}
          {filteredChallenges.length === 1 ? 'Challenge' : 'Challenges'}
        </Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.filterText}>Filter</Text>
          <IconButton
            icon="filter-variant"
            size={20}
            iconColor={COLORS.textPrimary}
          />
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
        style={{backgroundColor: COLORS.gray}}
      />
      <Title style={styles.emptyTitle}>
        {activeTab === 'active'
          ? 'No Active Challenges'
          : activeTab === 'completed'
          ? 'No Completed Challenges'
          : 'No Challenges Found'}
      </Title>

      <Paragraph style={styles.emptyText}>
        {activeTab === 'all' &&
          'Try adjusting your filters or create a new challenge'}
        {activeTab === 'active' &&
          'Start a challenge from the All tab to track your progress here'}
        {activeTab === 'completed' &&
          'Complete some challenges to see your achievements here'}
      </Paragraph>

      {activeTab === 'all' && (
        <Button
          mode="contained"
          onPress={() => setShowDialog(true)}
          style={{backgroundColor: COLORS.primary, marginTop: 16}}
          icon="plus">
          Create Challenge
        </Button>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>
            Loading nutrition challenges...
          </Text>
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
          refreshing={loading}
          onRefresh={fetchData}
        />
      )}

      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          style={styles.dialog}>
          <Dialog.Title>Create Nutrition Challenge</Dialog.Title>
          <Dialog.Content>
            <Text>
              Create a custom nutrition challenge from our recipe collection.
            </Text>
            <View style={styles.dialogSection}>
              <Text style={styles.dialogLabel}>Recipe Search</Text>
              <Text style={styles.dialogDescription}>
                Search for recipes to turn into challenges or create your own
                custom challenge.
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancel</Button>
            <Button
              onPress={() => setShowDialog(false)}
              mode="contained"
              style={{backgroundColor: COLORS.primary}}>
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
        useNativeDriver>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>See challenge details</Text>
          <Button
            mode="contained"
            onPress={() => {
              // Aqui você pode navegar para uma tela de detalhes, por exemplo:
              if (selectedChallenge) {
                navigation.navigate('ChallengeDetails', {
                  id: selectedChallenge.id,
                  recipeId: selectedChallenge.recipeId!,
                });
              }
              setIsModalVisible(false);
            }}
            style={{marginTop: 16}}>
            Go
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChallengesScreen;
