import React from 'react';
import { Button } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const FavoriteButton = ({ 
  onPress, 
  disabled 
}: { 
  onPress: () => void; 
  disabled?: boolean; 
}) => (
  <Button
    mode='contained'
    style={[styles.button, disabled && styles.buttonDisabled]}
    contentStyle={styles.buttonContent}
    onPress={onPress}
    disabled={disabled}
    labelStyle={styles.buttonLabel}>
    {disabled ? 'Already Favorited' : 'Favorite Recipe'}
  </Button>
);
