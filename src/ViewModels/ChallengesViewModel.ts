import { useState, useEffect, useCallback } from 'react';
import { Recipe, Challenge, ChallengeModel } from '../Models/ChallengesModel';
import { fetchRandomRecipes, fetchFeaturedRecipe } from '../Services/spoonacularService';
import { db } from '../Services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const useChallengesViewModel = () => {
  const [loading, setLoading] = useState(true);
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch custom challenges from Firestore
  const fetchChallengesFromFirebase = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'challenges'));
      return snapshot.docs.map(doc => doc.data() as Challenge);
    } catch (err) {
      console.error('Firebase fetch error:', err);
      return [];
    }
  }, []);

  // Load Spoonacular and Firebase data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [firebaseChallenges, featured, random] = await Promise.all([
        fetchChallengesFromFirebase(),
        fetchFeaturedRecipe(),
        fetchRandomRecipes(6),
      ]);

      setFeaturedRecipe(featured);
      setRandomRecipes(random);

      // Map random recipes to Challenge shape
      const spoonChallenges = random.map((recipe, idx) => ({
        id: `${recipe.id}-${idx}`,
        title: recipe.title.length > 30 ? `${recipe.title.substring(0, 30)}...` : recipe.title,
        description: `Follow this ${recipe.readyInMinutes} minute recipe`,
        category: 'Nutrition',
        difficulty: 'beginner' as const,
        daysToComplete: 7,
        currentDay: 0,
        progress: 0,
        status: 'pending' as const,
        icon: 'food',
        reward: `${(idx + 1) * 100} points`,
        participants: 0,
        recipeId: recipe.id,
        recipeImage: recipe.image,
        nutritionFocus: 'Balanced',
      }));

      setChallenges([...firebaseChallenges, ...spoonChallenges]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchChallengesFromFirebase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Handlers for View actions
   */
  const handleJoinChallenge = useCallback(async (challenge: Challenge, userId: string) => {
    try {
      await ChallengeModel.joinChallenge(challenge, userId);
      setChallenges(prev => prev.map(c => c.id === challenge.id ? { ...c, status: 'active', progress: 0, currentDay: 0 } : c));
    } catch (err) {
      console.error(err);
      setError('Failed to join challenge');
    }
  }, []);

  const handleTrackProgress = useCallback((challenge: Challenge, userId: string) => {
    ChallengeModel.trackProgress(challenge.id, userId, challenge.progress);
  }, []);

  const handleViewResults = useCallback((challenge: Challenge, userId: string) => {
    ChallengeModel.viewResults(challenge.id, userId);
  }, []);

  const handleChefHatAction = useCallback((challengeId: string) => {
    ChallengeModel.onChefHat(challengeId);
  }, []);

  const handleMoreOptions = useCallback((challengeId: string) => {
    ChallengeModel.onMoreOptions(challengeId);
  }, []);

  return {
    loading,
    randomRecipes,
    featuredRecipe,
    challenges,
    error,
    fetchData,
    handleJoinChallenge,
    handleTrackProgress,
    handleViewResults,
    handleChefHatAction,
    handleMoreOptions,
  };
};

export default useChallengesViewModel;
