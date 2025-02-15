import React from 'react';
import { Text } from 'react-native-paper';
import FitnessRecipes from '../FitnessRecipes';
import { styles } from '../../../View/PagesBottomTabs/Home/styles';

interface RecipeSectionProps {
  title: string;
  diet: string;
}

export const RecipeSection: React.FC<RecipeSectionProps> = ({ title, diet }) => (
  <>
    <Text style={styles.text}>{title}</Text>
    <FitnessRecipes diet={diet} />
  </>
);