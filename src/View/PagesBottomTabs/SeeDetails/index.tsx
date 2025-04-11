import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecipeDetailsViewModel } from '../../../ViewModels/RecipeDetailsViewModel';
import { SeeDetailsRouteProp } from '../../../App';
import { Title, Provider, Portal, Dialog, Button, Paragraph, Text } from 'react-native-paper';
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
import { COLORS } from '../../Colors';

const SeeDetails = ({ route }: { route: SeeDetailsRouteProp }) => {
  const { recipeId } = route.params;
  const { recipeDetails, loading, error, saveFavoriteRecipe, saveError, saveSuccess } = useRecipeDetailsViewModel(recipeId);
  const navigation = useNavigation();

  // Estados para controlar o diálogo
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  // Atualiza os estados conforme os erros ou sucesso de salvar
  useEffect(() => {
    if (saveError) {
      setDialogTitle('Erro');
      setDialogMessage(saveError);
      setDialogVisible(true);
    }
    if (saveSuccess) {
      setDialogTitle('Sucesso');
      setDialogMessage('Receita salva nos favoritos!');
      setDialogVisible(true);
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

            <FavoriteButton onPress={saveFavoriteRecipe} />
          </ScrollView>
        )}

        {/* Diálogo do react-native-paper */}
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} 
          style={{backgroundColor:COLORS.white}}>
            <Dialog.Title style={{color:COLORS.textPrimary}}>{dialogTitle}</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={{color:COLORS.textSecondary}}>{dialogMessage}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}><Text style={{color:COLORS.primary}}>Ok</Text></Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
};

export default SeeDetails;
