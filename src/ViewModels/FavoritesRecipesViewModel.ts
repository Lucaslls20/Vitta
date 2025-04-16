import { useState, useEffect } from 'react';
import { auth, db } from '../Services/firebaseConfig';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { FavoriteRecipe } from '../Models/FavoriteRecipeModel';

export const useFavoritesViewModel = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = () => {
    const user = auth.currentUser;
    if (!user) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    try {
      const favoritesRef = collection(db, 'users', user.uid, 'favorites');
      const q = query(favoritesRef);
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const recipes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        }) as FavoriteRecipe);
        
        setFavoriteRecipes(recipes);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
      setError('Erro ao carregar receitas favoritas');
      setLoading(false);
    }
  };

  const removeFavorite = async (recipeId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      await deleteDoc(doc(db, 'users', user.uid, 'favorites', recipeId));
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = fetchFavorites();
    return unsubscribe;
  }, []);

  return { favoriteRecipes, loading, error, removeFavorite };
};