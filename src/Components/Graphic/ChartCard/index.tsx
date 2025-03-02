import React from 'react';
import { View, Dimensions, Animated } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../View/PagesBottomTabs/Graphic/styles';
import { COLORS } from '../../../View/Colors';

interface ChartCardProps {
  chartData: any;
  chartConfig: any;
  quickStats: { goal: number };
  fadeAnim: Animated.Value;
  selectedPoint: { value: number; label: string; x: number; y: number } | null;
  handleDataPointClick: (data: any) => void;
  period: 'week' | 'month' | 'year';
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  chartData, chartConfig, quickStats, fadeAnim, selectedPoint, handleDataPointClick, period 
}) => {
  return (
    <Card style={styles.mainCard}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.cardTitle}>Daily Evolution</Title>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
              <Text style={styles.legendText}>Consumption</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.today }]} />
              <Text style={styles.legendText}>Today</Text>
            </View>
          </View>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            onDataPointClick={handleDataPointClick}
            getDotProps={(value, index) => {
              const isToday = period === 'week' &&
                chartData.labels[index] === new Date().toLocaleDateString('en-US', { weekday: 'short' });
              return {
                r: isToday ? 8 : 6,
                fill: isToday ? COLORS.today : COLORS.primary,
                stroke: isToday ? COLORS.accent : 'transparent',
                strokeWidth: 2,
              };
            }}
            decorator={() => {
              const maxData = Math.max(...chartData.datasets[0].data, quickStats.goal);
              const y = (1 - quickStats.goal / maxData) * 220;
              return (
                <View style={[styles.goalLine, { top: y }]}>
                  <Text style={styles.goalLineText}>Goal: {quickStats.goal}kcal</Text>
                </View>
              );
            }}
          />
        </Animated.View>

        {selectedPoint && (
          <View style={[styles.tooltip, { left: selectedPoint.x - 40, top: selectedPoint.y - 50 }]}>
            <Text style={styles.tooltipText}>{selectedPoint.label}</Text>
            <Text style={styles.tooltipText}>{selectedPoint.value} kcal</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default ChartCard;
