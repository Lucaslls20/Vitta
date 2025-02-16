import React from 'react';
import { View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const RecipeInfo = ({ preparationTime, pricePerServing }: {
  preparationTime?: string;
  pricePerServing?: string;
}) => (
  <View style={styles.infoContainer}>
    <Chip icon="clock-outline" style={styles.chip}>
      <Text style={styles.textChip}>{preparationTime}</Text>
    </Chip>
    <Chip icon="cash" style={[styles.chip, styles.priceChip]}>
      <Text style={styles.textChip}>Price per Portion: {pricePerServing}</Text>
    </Chip>
  </View>
);