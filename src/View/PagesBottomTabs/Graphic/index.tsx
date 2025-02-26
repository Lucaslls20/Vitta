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

// Definição de interfaces para tipagem
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
  // Define o estado com tipagem explícita para SelectedPoint ou null
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);
  const { period, setPeriod, chartData, quickStats, weeklyHighlights, loading } = useCalorieViewModel();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Função para animar a transição do gráfico
  const animateChart = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Sempre que o período ou os dados do gráfico mudarem, anima o gráfico e limpa o ponto selecionado
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
    propsForLabels: {
      fontSize: 12,
    },
    style: {
      borderRadius: 16,
    },
    fillShadowGradient: COLORS.accent,
    fillShadowGradientOpacity: 0.1,
  };

  // Tipando o parâmetro "data" para garantir que os campos existam
  const handleDataPointClick = (data: DataPoint) => {
    setSelectedPoint({
      value: data.value,
      label: chartData.labels[data.index],
      x: data.x,
      y: data.y,
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
                  {item === 'week' ? 'Semana' : item === 'month' ? 'Mês' : 'Ano'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Seção de Status Rápido */}
          <View style={styles.quickStats}>
            <Surface style={[styles.quickStat, { backgroundColor: COLORS.secondary }]}>
              <MaterialIcons name="local-fire-department" size={24} color={COLORS.tertiary} />
              <Text style={styles.quickStatValue}>{quickStats.currentDay}</Text>
              <Text style={styles.quickStatLabel}>Consumo hoje</Text>
              <ProgressBar 
                progress={quickStats.goal > 0 ? quickStats.currentDay / quickStats.goal : 0} 
                color={COLORS.primary}
                style={styles.progressBar}
              />
              <Text style={styles.quickStatGoal}>Meta: {quickStats.goal} kcal</Text>
            </Surface>

            <Surface style={[styles.quickStat, { backgroundColor: COLORS.accent }]}>
              <MaterialIcons name="calendar-month" size={24} color={COLORS.textPrimary} />
              <Text style={styles.quickStatValue}>{quickStats.periodTotal}</Text>
              <Text style={styles.quickStatLabel}>
                Total {period === 'week' ? 'semanal' : period === 'month' ? 'mensal' : 'anual'}
              </Text>
              <View style={styles.comparisonContainer}>
                <MaterialIcons 
                  name={quickStats.comparisonPercentage >= 0 ? 'trending-up' : 'trending-down'} 
                  size={20} 
                  color={quickStats.comparisonPercentage >= 0 ? COLORS.success : COLORS.error} 
                />
                <Text style={styles.comparisonText}>
                  {quickStats.comparisonPercentage >= 0 ? '+' : ''}
                  {quickStats.comparisonPercentage}% vs período anterior
                </Text>
              </View>
            </Surface>
          </View>

          {/* Gráfico Principal */}
          <Card style={styles.mainCard}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Title style={styles.cardTitle}>Evolução Diária</Title>
                <View style={styles.legend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                    <Text style={styles.legendText}>Consumo</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLORS.today }]} />
                    <Text style={styles.legendText}>Hoje</Text>
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
              <Title style={styles.sectionTitle}>Destaques da Semana</Title>
              <View style={styles.highlightsContainer}>
                <View style={styles.highlightItem}>
                  <MaterialIcons name="star" size={20} color={COLORS.tertiary} />
                  <Text style={styles.highlightText}>
                    Melhor dia: {weeklyHighlights.bestDay.day} ({weeklyHighlights.bestDay.calories} kcal)
                  </Text>
                </View>
                <View style={styles.highlightItem}>
                  <MaterialIcons name="info" size={20} color={COLORS.accent} />
                  <Text style={styles.highlightText}>
                    Média de calorias: {weeklyHighlights.averageCalories} kcal
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Cards de Ação */}
          <View style={styles.actionCards}>
            <Surface style={[styles.actionCard, { backgroundColor: COLORS.secondary }]}>
              <MaterialIcons name="restaurant" size={28} color={COLORS.primary} />
              <Text style={styles.actionCardText}>Registrar Refeição</Text>
            </Surface>
            <Surface style={[styles.actionCard, { backgroundColor: COLORS.accent }]}>
              <MaterialIcons name="fitness-center" size={28} color={COLORS.textPrimary} />
              <Text style={styles.actionCardText}>Adicionar Exercício</Text>
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
