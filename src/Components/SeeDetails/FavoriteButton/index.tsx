import React from 'react';
import { Button } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const FavoriteButton = ({ onPress }: { onPress: () => void }) => (
  <Button
    mode='contained'
    style={[styles.button, styles.buttonDisabled]}
    contentStyle={styles.buttonContent}
    onPress={onPress}
    labelStyle={styles.buttonLabel}>
    Favorite Recipe
  </Button>
);