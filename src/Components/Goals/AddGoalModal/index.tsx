
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {styles} from '../../../View/Goals/styles';
import { NewGoal } from '../../../Models/GoalsModel';

interface AddGoalModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  newGoal: NewGoal;
  setNewGoal: React.Dispatch<React.SetStateAction<NewGoal>>;
  addGoal: () => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({
  modalVisible,
  setModalVisible,
  newGoal,
  setNewGoal,
  addGoal,
  showDatePicker,
  setShowDatePicker,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>New Goal</Text>
        <TextInput
          label="Title"
          value={newGoal.title}
          onChangeText={text => setNewGoal(prev => ({ ...prev, title: text }))}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Description (optional)"
          value={newGoal.description}
          onChangeText={text => setNewGoal(prev => ({ ...prev, description: text }))}
          mode="outlined"
          multiline
          style={[styles.input, styles.multilineInput]}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <Text>
            Term: {format(newGoal.deadline, 'dd/MM/yyyy', { locale: pt })}
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
                setNewGoal(prev => ({ ...prev, deadline: selectedDate }));
              }
            }}
          />
        )}
        <Button
          mode="contained"
          onPress={addGoal}
          disabled={!newGoal.title.trim()}
          style={[styles.submitButton, { marginTop: 16 }]}>
          Add Goal
        </Button>
      </View>
    </Modal>
  );
};

export default AddGoalModal;
