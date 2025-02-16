import React from 'react';
import { Image } from 'react-native';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const RecipeImage = ({ uri }: { uri?: string }) => (
  <Image
    source={{ uri }}
    style={styles.recipeImage}
    resizeMode="cover"
  />
);