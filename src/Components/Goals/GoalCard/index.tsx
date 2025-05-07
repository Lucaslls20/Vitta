import React from 'react';
import { View, Text } from 'react-native';
import { Surface, Divider, List, IconButton, Chip } from 'react-native-paper';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/Goals/styles';
import { Goal } from '../../../Models/GoalsModel';

interface GoalCardProps {
  goal: Goal;
  toggleGoalCompletion: (id: string) => void;
  deleteGoal: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, toggleGoalCompletion, deleteGoal }) => {
  const isOverdue = goal.deadline < new Date() && !goal.completed;

  const renderGoalStatusChip = () => (
    <Chip
      mode="outlined"
      style={{
        backgroundColor: goal.completed
          ? COLORS.status.completed
          : isOverdue
          ? COLORS.status.overdue
          : COLORS.status.pending,
        alignSelf: 'flex-start',
      }}
      textStyle={{ color: COLORS.text.light }}>
      {goal.completed ? 'Concluída' : isOverdue ? 'Atrasada' : 'Pendente'}
    </Chip>
  );

  return (
    <Animatable.View animation="fadeIn" duration={500}>
      <Surface style={styles.goalCard}>
        <List.Item
          title={goal.title}
          titleStyle={styles.goalTitle}
          description={goal.description || ''}
          descriptionStyle={styles.goalDescription}
          right={() => (
            <View style={styles.statusContainer}>
              {renderGoalStatusChip()}
            </View>
          )}
        />
        <Divider style={styles.cardDivider} />
        <View style={styles.cardFooter}>
          <View style={styles.dateContainer}>
            <IconButton
              icon={goal.completed ? 'undo' : 'check-circle'}
              iconColor={goal.completed ? COLORS.status.completed : COLORS.accent}
              size={24}
              onPress={() => toggleGoalCompletion(goal.id)}
            />
            <Text style={[styles.deadlineText, { marginLeft: 8 }]}>
              {format(goal.deadline, 'dd MMM yyyy', { locale: pt })}
            </Text>
          </View>
          <IconButton
            icon="trash-can"
            iconColor={COLORS.status.overdue}
            size={24}
            onPress={() => deleteGoal(goal.id)}
          />
        </View>
      </Surface>
    </Animatable.View>
  );
};

export default GoalCard;