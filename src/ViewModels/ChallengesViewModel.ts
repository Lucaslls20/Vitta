import { useState, useEffect, useCallback } from 'react';
import { Recipe, Challenge } from '../Models/ChallengesModel';
import { db } from '../Services/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const SPOONACULAR_API_KEY = '7f5896bcc0644617a509b22ffc142782';

const useChallengesViewModel = () => {
  const [loading, setLoading] = useState(true);
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);

  const createChallengeFromRecipe = useCallback((recipe: Recipe, index: number): Challenge => {
    const categories = ['Nutrition', 'Healthy Eating', 'Weight Loss', 'Clean Eating', 'Meal Prep', 'Vegan'];
    const difficulties = ['beginner', 'intermediate', 'advanced'];
    const statuses = ['pending'];
    const icons = ['food-apple', 'food', 'food-variant', 'pasta', 'fruit-watermelon', 'food-fork-drink'];
    const nutritionFocus = ['Protein', 'Low Carb', 'Low Fat', 'High Fiber', 'Low Sugar', 'Balanced'];

    const status = statuses[index % statuses.length];
    const progress = status === 'completed' ? 1.0 : status === 'active' ? Math.random() * 0.8 + 0.1 : 0;
    const daysToComplete = Math.floor(Math.random() * 20) + 7;

    return {
      id: `${recipe.id}-${index}`,
      title: recipe.title.length > 30 ? `${recipe.title.substring(0, 30)}...` : recipe.title,
      description: `Follow this ${recipe.readyInMinutes} minute recipe`,
      category: categories[index % categories.length],
      difficulty: difficulties[index % difficulties.length] as Challenge['difficulty'],
      daysToComplete,
      currentDay: Math.floor(progress * daysToComplete),
      progress,
      status: status as Challenge['status'],
      icon: icons[index % icons.length],
      reward: `${(index + 1) * 100} points`,
      participants: Math.floor(Math.random() * 1000) + 100,
      recipeId: recipe.id,
      recipeImage: recipe.image,
      nutritionFocus: nutritionFocus[index % nutritionFocus.length],
    };
  }, []);

  const fetchChallengesFromFirebase = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'challenges'));
      return querySnapshot.docs.map(doc => doc.data() as Challenge);
    } catch (err) {
      console.error('Firebase error:', err);
      return [];
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados do Firebase
      const firebaseChallenges = await fetchChallengesFromFirebase();

      // Buscar receitas da Spoonacular
      const [featuredResponse, randomResponse] = await Promise.all([
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=1`),
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=6`),
      ]);

      const featuredData = await featuredResponse.json();
      const randomData = await randomResponse.json();

      const spoonacularChallenges = randomData.recipes.map((recipe: Recipe, index: number) =>
        createChallengeFromRecipe(recipe, index)
      );

      setFeaturedRecipe(featuredData.recipes[0]);
      setRandomRecipes(randomData.recipes);
      setChallenges([...firebaseChallenges, ...spoonacularChallenges]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [createChallengeFromRecipe, fetchChallengesFromFirebase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, randomRecipes, featuredRecipe, challenges, error, fetchData };
};

export default useChallengesViewModel;