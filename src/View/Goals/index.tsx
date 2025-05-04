import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FAB, Provider as PaperProvider, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../Colors';
import { styles } from './styles';
import Header from '../../Components/Goals/Header';
import PeriodSelector from '../../Components/Goals/PeriodSelector'
import GoalCard, {Goal} from '../../Components/Goals/GoalCard';
import AddGoalModal from '../../Components/Goals/AddGoalModal';

const GoalsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  // Estados
  const [goals, setGoals] = useState<Goal[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Funções de gerenciamento de meta
  const addGoal = useCallback(() => {
    if (newGoal.title.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        ...newGoal,
        completed: false,
      };
      setGoals(prevGoals => [...prevGoals, goal]);
      setNewGoal({ title: '', description: '', deadline: new Date() });
      setModalVisible(false);
    }
  }, [newGoal]);

  const toggleGoalCompletion = useCallback((id: string) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
  }, []);

  return (
    <PaperProvider >
      <Header />
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <PeriodSelector selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
        <ScrollView contentContainerStyle={styles.goalsContainer}>
          {goals.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: COLORS.text.secondary, fontSize: 16 }}>
                No goals found
              </Text>
              <Text style={{ color: COLORS.text.secondary, marginTop: 8, fontSize: 16 }}>
                Tap the + to add a new goal
              </Text>
            </View>
          ) : (
            goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                toggleGoalCompletion={toggleGoalCompletion}
                deleteGoal={deleteGoal}
              />
            ))
          )}
        </ScrollView>
        <AddGoalModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          addGoal={addGoal}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />
        <FAB
          icon="plus"
          style={[styles.fab, { bottom: insets.bottom, backgroundColor: COLORS.accent }]}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </PaperProvider>
  );
};

export default GoalsScreen;