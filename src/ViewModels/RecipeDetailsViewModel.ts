import { useState, useEffect } from 'react';
import { auth, db } from '../Services/firebaseConfig';
import { APIKEY } from '../Services/SpoonacularConfig';
import { RecipeDetails } from '../Models/RecipeDetailsModel';
import { collection, doc, setDoc } from 'firebase/firestore';

const BASE_URL = 'https://api.spoonacular.com/recipes';

export const useRecipeDetailsViewModel = (recipeId: number) => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveFavoriteRecipe = async () => {
    try {
      setSaveError(null);
      setSaveSuccess(false);
  
      if (!recipeDetails) {
        throw new Error('Detalhes da receita não disponíveis');
      }
  
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado. Faça login para salvar favoritos.');
      }
  
      const favoriteData = {
        title: recipeDetails.title,
        imageUrl: recipeDetails.imageUrl,
        preparationTime: recipeDetails.preparationTime,
        recipeId: recipeDetails.id,
        createdAt: new Date()  // Adiciona timestamp para ordenação
      };
  
      // Referência direta usando caminho completo
      const docRef = doc(db, 'users', user.uid, 'favorites', String(recipeDetails.id));
      
      await setDoc(docRef, favoriteData, { merge: true });
      
      console.log('Documento salvo com ID:', docRef.id);
      setSaveSuccess(true);
  
    } catch (err: any) {
      console.error('Erro ao salvar favorito:', err);
      setSaveError(err.message);
    }
  };

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/${recipeId}/information?apiKey=${APIKEY}`
      );

      if (!response.ok) throw new Error('Erro ao buscar detalhes da receita');

      const data = await response.json();
      const price = (data.pricePerServing / 100).toFixed(2);

      const mappedDetails: RecipeDetails = {
        id: data.id,
        title: data.title,
        imageUrl: data.image,
        preparationTime: `${data.readyInMinutes} min`,
        pricePerServing: `$${price}`,
        ingredients: data.extendedIngredients.map((ing: any) => ing.original),
        preparationSteps: data.analyzedInstructions[0]?.steps.map((step: any) => step.step) || [],
      };

      setRecipeDetails(mappedDetails);
    } catch (err) {
      setError('Erro ao carregar detalhes da receita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipeId) fetchRecipeDetails();
  }, [recipeId]);

  return { recipeDetails, loading, error, saveFavoriteRecipe, saveError, saveSuccess };
};
