import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {
  Appbar,
  FAB,
  TextInput,
  Button,
  Provider as PaperProvider,
  Chip,
  Surface,
  Divider,
  List,
  IconButton,
} from 'react-native-paper';
import {format, parseISO} from 'date-fns';
import {pt} from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../Colors';
import {theme} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../App';
import Modal from 'react-native-modal';

// Goal Interface
interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

const GoalsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();

  // State Management
  const [goals, setGoals] = useState<Goal[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('week');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Goal Management Functions
  const addGoal = useCallback(() => {
    if (newGoal.title.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        ...newGoal,
        completed: false,
      };
      setGoals(prevGoals => [...prevGoals, goal]);
      resetGoalForm();
    }
  }, [newGoal]);

  const toggleGoalCompletion = useCallback((id: string) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id ? {...goal, completed: !goal.completed} : goal,
      ),
    );
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
  }, []);

  const resetGoalForm = () => {
    setNewGoal({title: '', description: '', deadline: new Date()});
    setModalVisible(false);
  };

  // Render Goal Status Chip
  const renderGoalStatusChip = (goal: Goal) => {
    const isOverdue = goal.deadline < new Date() && !goal.completed;

    return (
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
        textStyle={{color: COLORS.text.light}}>
        {goal.completed ? 'Concluída' : isOverdue ? 'Atrasada' : 'Pendente'}
      </Chip>
    );
  };

  return (
    <PaperProvider theme={theme}>
      {/* Enhanced Header */}
      <Appbar.Header
        style={{
          backgroundColor: COLORS.white,
          elevation: 4,
        }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="My Goals"
          titleStyle={{
            color: COLORS.textSecondary,
            fontWeight: 'bold',
          }}
        />
      </Appbar.Header>

      <Divider
        style={{
          backgroundColor: COLORS.shadow,
          width: '90%',
          marginRight: 10,
          marginLeft: 10,
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingBottom: insets.bottom,
        }}>
        {/* Period Selector */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 16,
          }}>
          {(['week', 'month', 'year'] as const).map(period => (
            <Chip
              key={period}
              selected={selectedPeriod === period}
              onPress={() => setSelectedPeriod(period)}
              style={{marginHorizontal: 8, backgroundColor: COLORS.secondary}}>
              {period === 'week'
                ? 'Week'
                : period === 'month'
                ? 'Mounth'
                : 'Year'}
            </Chip>
          ))}
        </View>

        {/* Goals List */}
        <ScrollView contentContainerStyle={{padding: 16}}>
          {goals.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
              }}>
              <Text style={{color: COLORS.text.secondary, fontSize: 16}}>
                No goals found
              </Text>
              <Text
                style={{
                  color: COLORS.text.secondary,
                  marginTop: 8,
                  fontSize: 16,
                }}>
                Tap the + to add a new goal
              </Text>
            </View>
          ) : (
            goals.map(goal => (
              <Animatable.View
                key={goal.id}
                animation="fadeIn"
                duration={500}
                style={{marginBottom: 16}}>
                <Surface
                  style={{
                    elevation: 2,
                    borderRadius: 16,
                    backgroundColor: COLORS.white,
                  }}>
                  <List.Item
                    title={goal.title}
                    titleStyle={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: COLORS.text.primary,
                    }}
                    description={goal.description || ''}
                    descriptionStyle={{
                      color: COLORS.text.secondary,
                      marginTop: 4,
                    }}
                    right={props => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingRight: 8,
                        }}>
                        {renderGoalStatusChip(goal)}
                      </View>
                    )}
                  />

                  <Divider />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 16,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <IconButton
                        icon={goal.completed ? 'undo' : 'check-circle'}
                        iconColor={
                          goal.completed
                            ? COLORS.status.completed
                            : COLORS.accent
                        }
                        size={24}
                        onPress={() => toggleGoalCompletion(goal.id)}
                      />
                      <Text
                        style={{
                          color: COLORS.text.secondary,
                          marginLeft: 8,
                        }}>
                        {format(goal.deadline, 'dd MMM yyyy', {locale: pt})}
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
            ))
          )}
        </ScrollView>

        {/* Add Goal Modal */}
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.4}
          style={{
            margin: 20,
            justifyContent: 'flex-start',
            marginTop: 60, // Ajuste conforme necessário
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 16,
                color: COLORS.text.primary,
              }}>
              New Goal
            </Text>

            <TextInput
              label="Title"
              value={newGoal.title}
              onChangeText={text =>
                setNewGoal(prev => ({...prev, title: text}))
              }
              mode="outlined"
              style={{marginBottom: 12}}
            />

            <TextInput
              label="Description (optional)"
              value={newGoal.description}
              onChangeText={text =>
                setNewGoal(prev => ({...prev, description: text}))
              }
              mode="outlined"
              multiline
              style={{marginBottom: 12, minHeight: 100}}
            />

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: COLORS.text.secondary,
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
              }}>
              <Text>
                Term: {format(newGoal.deadline, 'dd/MM/yyyy', {locale: pt})}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newGoal.deadline}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setNewGoal(prev => ({...prev, deadline: selectedDate}));
                  }
                }}
              />
            )}

            <Button
              mode="contained"
              onPress={addGoal}
              disabled={!newGoal.title.trim()}
              style={{marginTop: 16}}>
              Add Goal
            </Button>
          </View>
        </Modal>

        {/* Floating Action Button */}
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: insets.bottom,
            backgroundColor: COLORS.accent,
          }}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </PaperProvider>
  );
};

export default GoalsScreen;
