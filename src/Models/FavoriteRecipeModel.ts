export interface FavoriteRecipe {
    id: string;         // ID do documento no Firestore
    recipeId: number;   // ID original da receita na API
    title: string;
    imageUrl: string;
    preparationTime: string;
    createdAt: Date;
  }