import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/Goals/styles';

type Period = 'week' | 'month' | 'year';

interface PeriodSelectorProps {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selectedPeriod, setSelectedPeriod }) => {
  const periods: Period[] = ['week', 'month', 'year'];

  return (
    <View style={[styles.periodContainer, { flexDirection: 'row', justifyContent: 'center' }]}>
      {periods.map(period => {
        const isSelected = selectedPeriod === period;
        return (
          <Chip
            key={period}
            mode="flat"
            onPress={() => setSelectedPeriod(period)}
            style={[
              styles.periodChip,
              { marginHorizontal: 8, backgroundColor: COLORS.secondary }
            ]}
            textStyle={{
              color: isSelected ? COLORS.gray : COLORS.text.primary,
            }}>
            {period === 'week' ? 'Week' : period === 'month' ? 'Month' : 'Year'}
          </Chip>
        );
      })}
    </View>
  );
};

export default PeriodSelector;