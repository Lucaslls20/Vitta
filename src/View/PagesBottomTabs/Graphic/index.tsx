import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { Card, Title, Text, Surface, FAB, ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../Colors';
import { Header } from '../../../Components/Health/Header';
import { styles } from './styles';

interface ChartDataType {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity?: number) => string;
    strokeWidth: number;
  }[];
}

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
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);
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

  // Executa a animação sempre que o período é alterado
  useEffect(() => {
    animateChart();
    setSelectedPoint(null); // limpa o ponto selecionado ao trocar de período
  }, [period]);

  // Retorna os dados do gráfico com base no período selecionado
  const getChartData = (): ChartDataType => {
    if (period === 'week') {
      return {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          data: [1800, 2100, 1950, 2400, 2250, 2000, 2300],
          color: (opacity = 1) => COLORS.primary,
          strokeWidth: 2,
        }],
      };
    } else if (period === 'month') {
      return {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          data: [14000, 15000, 13000, 16000],
          color: (opacity = 1) => COLORS.primary,
          strokeWidth: 2,
        }],
      };
    } else if (period === 'year') {
      return {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
          data: [60000, 62000, 58000, 64000, 63000, 65000, 67000, 66000, 68000, 69000, 70000, 71000],
          color: (opacity = 1) => COLORS.primary,
          strokeWidth: 2,
        }],
      };
    }
    // Fallback (nunca deve ocorrer)
    return { labels: [], datasets: [{ data: [], color: (opacity = 1) => COLORS.primary, strokeWidth: 2 }] };
  };

  const chartData = getChartData();

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

  // Manipulador do clique em um ponto do gráfico
  const handleDataPointClick = (data: DataPoint) => {
    setSelectedPoint({
      value: data.value,
      label: chartData.labels[data.index],
      x: data.x,
      y: data.y,
    });
  };

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
            <Surface style={[styles.quickStat, {backgroundColor: COLORS.secondary}]}>
              <MaterialIcons name="local-fire-department" size={24} color={COLORS.tertiary} />
              <Text style={styles.quickStatValue}>2.300</Text>
              <Text style={styles.quickStatLabel}>Consumo hoje</Text>
              <ProgressBar 
                progress={0.76} 
                color={COLORS.primary}
                style={styles.progressBar}
              />
              <Text style={styles.quickStatGoal}>Meta: 3.000 kcal</Text>
            </Surface>

            <Surface style={[styles.quickStat, {backgroundColor: COLORS.accent}]}>
              <MaterialIcons name="calendar-month" size={24} color={COLORS.textPrimary} />
              <Text style={styles.quickStatValue}>15.400</Text>
              <Text style={styles.quickStatLabel}>Total semanal</Text>
              <View style={styles.comparisonContainer}>
                <MaterialIcons 
                  name="trending-up" 
                  size={20} 
                  color={COLORS.success} 
                />
                <Text style={styles.comparisonText}>+5% vs semana anterior</Text>
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
                    <View style={[styles.legendDot, {backgroundColor: COLORS.primary}]} />
                    <Text style={styles.legendText}>Consumo</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, {backgroundColor: COLORS.today}]} />
                    <Text style={styles.legendText}>Hoje</Text>
                  </View>
                </View>
              </View>

              <Animated.View style={{opacity: fadeAnim}}>
                <LineChart
                  data={chartData}
                  width={Dimensions.get('window').width - 32}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                  onDataPointClick={handleDataPointClick}
                />
              </Animated.View>

              {/* Exibe os detalhes do ponto selecionado */}
              {selectedPoint && (
                <View style={[styles.tooltip, {left: selectedPoint.x - 40, top: selectedPoint.y - 50}]}>
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
                  <Text style={styles.highlightText}>Melhor dia: Qui (2.400 kcal)</Text>
                </View>
                <View style={styles.highlightItem}>
                  <MaterialIcons name="info" size={20} color={COLORS.accent} />
                  <Text style={styles.highlightText}>Média de proteínas: 120g/dia</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Cards de Ação */}
          <View style={styles.actionCards}>
            <Surface style={[styles.actionCard, {backgroundColor: COLORS.secondary}]}>
              <MaterialIcons name="restaurant" size={28} color={COLORS.primary} />
              <Text style={styles.actionCardText}>Registrar Refeição</Text>
            </Surface>
            <Surface style={[styles.actionCard, {backgroundColor: COLORS.accent}]}>
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
