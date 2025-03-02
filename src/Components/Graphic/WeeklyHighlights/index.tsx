import React from 'react';
import { View } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../View/PagesBottomTabs/Graphic/styles';
import { COLORS } from '../../../View/Colors';

interface WeeklyHighlightsProps {
  weeklyHighlights: {
    bestDay: { day: string; calories: number };
    averageCalories: number;
  };
}

const WeeklyHighlights: React.FC<WeeklyHighlightsProps> = ({ weeklyHighlights }) => {
  return (
    <Card style={styles.highlightsCard}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Highlights of the Week</Title>
        <View style={styles.highlightsContainer}>
          <View style={styles.highlightItem}>
            <MaterialIcons name="star" size={20} color={COLORS.tertiary} />
            <Text style={styles.highlightText}>
              Best day: {weeklyHighlights.bestDay.day} ({weeklyHighlights.bestDay.calories} kcal)
            </Text>
          </View>
          <View style={styles.highlightItem}>
            <MaterialIcons name="info" size={20} color={COLORS.accent} />
            <Text style={styles.highlightText}>
              Calorie average: {weeklyHighlights.averageCalories} kcal
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WeeklyHighlights;
