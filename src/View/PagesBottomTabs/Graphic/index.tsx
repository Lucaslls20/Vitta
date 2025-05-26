import React, { useState, useRef, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Dimensions, 
  ScrollView, 
  Animated, 
  ActivityIndicator 
} from 'react-native';
import { FAB } from 'react-native-paper';
import { COLORS } from '../../Colors';
import { Header } from '../../../Components/Health/Header';
import useCalorieViewModel from '../../../ViewModels/useGraphicViewModel';
import { styles } from './styles';
import PeriodSelector from '../../../Components/Graphic/PeriodSelector';
import QuickStats from '../../../Components/Graphic/QuickStats';
import ChartCard from '../../../Components/Graphic/ChartCard';
import WeeklyHighlights from '../../../Components/Graphic/WeeklyHighlights';
import ActionCards from '../../../Components/Graphic/ActionCards';

const GraphicScreen = () => {
  const [selectedPoint, setSelectedPoint] = useState<{
    value: number;
    label: string;
    x: number;
    y: number;
  } | null>(null);

  const { period, setPeriod, chartData, quickStats, weeklyHighlights, loading } = useCalorieViewModel();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Função de animação para transição do gráfico
  const animateChart = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Reinicia a animação e limpa o tooltip sempre que o período ou os dados mudarem
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

  const handleDataPointClick = (data: any) => {
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
          userAvatar="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D" 
        />

        <ScrollView contentContainerStyle={styles.content}>
          <PeriodSelector period={period} setPeriod={setPeriod} />
          <QuickStats quickStats={quickStats} period={period} />
          <ChartCard 
            chartData={chartData} 
            chartConfig={chartConfig} 
            quickStats={quickStats} 
            fadeAnim={fadeAnim} 
            selectedPoint={selectedPoint} 
            handleDataPointClick={handleDataPointClick}
            period={period}
          />
          <WeeklyHighlights weeklyHighlights={weeklyHighlights} period={period} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GraphicScreen;
