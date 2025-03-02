import React from 'react';
import { View } from 'react-native';
import { Surface, Text, ProgressBar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../View/PagesBottomTabs/Graphic/styles';
import { COLORS } from '../../../View/Colors';

interface QuickStatsProps {
  quickStats: {
    currentDay: number;
    goal: number;
    periodTotal: number;
    comparisonPercentage: number;
  };
  period: 'week' | 'month' | 'year';
}

const QuickStats: React.FC<QuickStatsProps> = ({ quickStats, period }) => {
  return (
    <View style={styles.quickStats}>
      <Surface style={[styles.quickStat, { backgroundColor: COLORS.secondary }]}>
        <MaterialIcons name="local-fire-department" size={24} color={COLORS.tertiary} />
        <Text style={styles.quickStatValue}>{quickStats.currentDay}</Text>
        <Text style={styles.quickStatLabel}>Consumption today</Text>
        <ProgressBar 
          progress={quickStats.goal > 0 ? quickStats.currentDay / quickStats.goal : 0} 
          color={COLORS.primary}
          style={styles.progressBar}
        />
        <Text style={styles.quickStatGoal}>Goal: {quickStats.goal} kcal</Text>
      </Surface>

      <Surface style={[styles.quickStat, { backgroundColor: COLORS.accent }]}>
        <MaterialIcons name="calendar-month" size={24} color={COLORS.textPrimary} />
        <Text style={styles.quickStatValue}>{quickStats.periodTotal}</Text>
        <Text style={styles.quickStatLabel}>
          Total {period === 'week' ? 'weekly' : period === 'month' ? 'monthly' : 'annual'}
        </Text>
        <View style={styles.comparisonContainer}>
          <MaterialIcons 
            name={quickStats.comparisonPercentage >= 0 ? 'trending-up' : 'trending-down'} 
            size={20} 
            color={quickStats.comparisonPercentage >= 0 ? COLORS.success : COLORS.error} 
          />
          <Text style={styles.comparisonText}>
            {quickStats.comparisonPercentage >= 0 ? '+' : ''}
            {quickStats.comparisonPercentage}% vs previous period
          </Text>
        </View>
      </Surface>
    </View>
  );
};

export default QuickStats;
