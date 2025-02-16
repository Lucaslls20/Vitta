// src/components/StatsSection.tsx
import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/Profile/styles';

export interface StatItem {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <Surface style={styles.statsContainer} elevation={2}>
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <View style={styles.statItem}>
            <Text variant="titleMedium" style={styles.statNumber}>
              {stat.value}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              {stat.label}
            </Text>
          </View>
          {index !== stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </Surface>
  );
};

export default StatsSection;
