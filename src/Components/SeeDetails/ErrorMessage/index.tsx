import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const ErrorMessage = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{error}</Text>
    <Button mode="contained" onPress={onRetry} style={styles.button}>
      Back
    </Button>
  </View>
);