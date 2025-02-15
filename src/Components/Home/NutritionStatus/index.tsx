import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderNutritionCard from '../renderNutricionCard';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Home/styles';

interface NutritionStatusProps {
  loading: boolean;
  error: string | null;
  nutrition: any;
}

export const NutritionStatus: React.FC<NutritionStatusProps> = ({
  loading,
  error,
  nutrition
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
        <Text style={styles.loadingText}>Analyzing nutritional values...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={40} color={COLORS.error} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (nutrition) {
    return <RenderNutritionCard nutrition={nutrition} />;
  }

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        Let's get started!{'\n'}
        <Text style={styles.emptySubtext}>
          Search for a food to see its nutritional information
        </Text>
      </Text>
    </View>
  );
};