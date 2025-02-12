import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Health/styles';

export const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);