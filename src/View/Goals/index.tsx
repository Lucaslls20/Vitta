import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FAB, Provider as PaperProvider, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../Colors';
import { styles } from './styles';
import Header from '../../Components/Goals/Header';
import PeriodSelector from '../../Components/Goals/PeriodSelector';
import GoalCard from '../../Components/Goals/GoalCard';
import AddGoalModal from '../../Components/Goals/AddGoalModal';
import {useGoalsViewModel} from '../../ViewModels/GoalsViewModel';

const GoalsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const {
    filteredGoals,
    newGoal,
    modalVisible,
    showDatePicker,
    selectedPeriod,
    setNewGoal,
    setModalVisible,
    setShowDatePicker,
    setSelectedPeriod,
    addGoal,
    toggleCompletion,
    deleteGoal,
  } = useGoalsViewModel();

  return (
    <PaperProvider>
      <Header />
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <ScrollView contentContainerStyle={styles.goalsContainer}>
          {filteredGoals.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: COLORS.text.secondary, fontSize: 16 }}>
                No goals found
              </Text>
              <Text style={{ color: COLORS.text.secondary, marginTop: 8, fontSize: 16 }}>
                Tap the + to add a new goal
              </Text>
            </View>
          ) : (
            filteredGoals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                toggleGoalCompletion={toggleCompletion}
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
