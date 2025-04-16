import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecipeDetailsViewModel } from '../../../ViewModels/RecipeDetailsViewModel';
import { SeeDetailsRouteProp } from '../../../App';
import { Title, Provider, Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { styles } from './styles';
import { HeaderComponent } from '../../../Components/SeeDetails/HeaderComponent';
import { RecipeImage } from '../../../Components/SeeDetails/RecipeImage';
import { ErrorMessage } from '../../../Components/SeeDetails/ErrorMessage';
import { LoadingIndicator } from '../../../Components/SeeDetails/LoadingIndicator';
import { DetailsCard } from '../../../Components/SeeDetails/DetailsCard';
import { RecipeInfo } from '../../../Components/SeeDetails/RecipeInfo';
import { Ingredients } from '../../../Components/SeeDetails/Ingredients';
import { PreparationSteps } from '../../../Components/SeeDetails/PreparationSteps';
import { FavoriteButton } from '../../../Components/SeeDetails/FavoriteButton';

const SeeDetails = ({ route }: { route: SeeDetailsRouteProp }) => {
  const { recipeId } = route.params;
  const { recipeDetails, loading, error, saveFavoriteRecipe, saveError, saveSuccess, isFavorite } = useRecipeDetailsViewModel(recipeId);
  const navigation = useNavigation();

  // Atualiza os estados conforme os erros ou sucesso de salvar
  useEffect(() => {
    if (saveError) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: saveError,
      });
    }
    if (saveSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Recipe saved to favorites!',
      });
    }
  }, [saveError, saveSuccess]);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <HeaderComponent title="Recipe Details" onBack={() => navigation.goBack()} />

        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorMessage error={error} onRetry={() => navigation.goBack()} />
        ) : (
          <ScrollView>
            <RecipeImage uri={recipeDetails?.imageUrl} />

            <DetailsCard>
              <Title style={styles.title}>{recipeDetails?.title}</Title>
              <RecipeInfo
                preparationTime={recipeDetails?.preparationTime}
                pricePerServing={recipeDetails?.pricePerServing}
              />
            </DetailsCard>

            <DetailsCard>
              <Ingredients ingredients={recipeDetails?.ingredients} />
            </DetailsCard>

            <DetailsCard>
              <PreparationSteps steps={recipeDetails?.preparationSteps} />
            </DetailsCard>

            <FavoriteButton onPress={saveFavoriteRecipe} disabled={saveSuccess || isFavorite} />
          </ScrollView>
        )}

        <Toast />
      </SafeAreaView>
    </Provider>
  );
};

export default SeeDetails;