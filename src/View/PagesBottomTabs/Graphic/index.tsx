import React, { useState, useRef, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Dimensions, 
  ScrollView, 
  Animated, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { Card, Title, Text, Surface, FAB, ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../Colors';
import { Header } from '../../../Components/Health/Header';
import useCalorieViewModel from '../../../ViewModels/useGraphicViewModel';
import { styles } from './styles';

interface SelectedPoint {
  value: number;
  label: string;
  x: number;
  y: number;
}

interface DataPoint {
  value: number;
  x: number;
  y: number;
  index: number;
}

const GraphicScreen = () => {
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);
  const { period, setPeriod, chartData, quickStats, weeklyHighlights, loading } = useCalorieViewModel();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animação para transição do gráfico
  const animateChart = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Sempre que o período ou os dados mudarem, reinicia a animação e limpa o tooltip
  useEffect(() => {
    animateChart();
    setSelectedPoint(null);
  }, [period, chartData]);

  const chartConfig = {
    backgroundColor: COLORS.white,
    backgroundGradientFrom: COLORS.secondary,
    backgroundGradientTo: COLORS.secondary,
    decimalPlaces: 0,
    color: (opacity = 1) => COLORS.primary,
    labelColor: (opacity = 1) => COLORS.textSecondary,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: COLORS.accent,
    },
    fillShadowGradient: COLORS.primary,
    fillShadowGradientOpacity: 0.1,
    propsForBackgroundLines: {
      stroke: COLORS.border,
      strokeDasharray: '3 3',
    },
  };

  // Tooltip aprimorado: reposiciona considerando a largura da tela e define deslocamento vertical
  const handleDataPointClick = (data: DataPoint) => {
    const screenWidth = Dimensions.get('window').width;
    const tooltipWidth = 80;
    const x = Math.max(16, Math.min(data.x - tooltipWidth / 2, screenWidth - tooltipWidth - 16));
  
    setSelectedPoint({
      value: data.value,
      label: chartData.labels[data.index],
      x,
      y: data.y - 50,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ActivityIndicator 
          size="large" 
          color={COLORS.primary} 
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} 
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Header 
          userName="João Silva" 
          userAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s" 
        />

        <ScrollView contentContainerStyle={styles.content}>
          {/* Seletor de Período */}
          <View style={styles.periodSelector}>
            {(['week', 'month', 'year'] as const).map((item) => (
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

          {/* Status Rápido */}
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

          {/* Gráfico Principal com destaque para o dia atual e linha de meta interativa */}
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

          {/* Destaques da Semana */}
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

          {/* Cards de Ação */}
          <View style={styles.actionCards}>
            <Surface style={[styles.actionCard, { backgroundColor: COLORS.secondary }]}>
              <MaterialIcons name="restaurant" size={28} color={COLORS.primary} />
              <Text style={styles.actionCardText}>Register Meal</Text>
            </Surface>
            <Surface style={[styles.actionCard, { backgroundColor: COLORS.accent }]}>
              <MaterialIcons name="fitness-center" size={28} color={COLORS.textPrimary} />
              <Text style={styles.actionCardText}>Add Exercise</Text>
            </Surface>
          </View>
        </ScrollView>

        <FAB
          style={styles.fab}
          icon="plus"
          color={COLORS.textOnPrimary}
          theme={{ colors: { accent: COLORS.primary } }}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </SafeAreaView>
  );
};

export default GraphicScreen;
