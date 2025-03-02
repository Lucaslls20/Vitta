import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/Graphic/styles';

type Period = 'week' | 'month' | 'year';

interface PeriodSelectorProps {
  period: Period;
  setPeriod: (period: Period) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ period, setPeriod }) => {
  const periods: Period[] = ['week', 'month', 'year'];

  return (
    <View style={styles.periodSelector}>
      {periods.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.periodButton, period === item && styles.periodButtonActive]}
          onPress={() => setPeriod(item)}
        >
          <Text style={[styles.periodButtonText, period === item && styles.periodButtonTextActive]}>
            {item === 'week' ? 'Week' : item === 'month' ? 'Month' : 'Year'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PeriodSelector;
