import React from 'react';
import { ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, View } from 'react-native';
import { Text, TextInput, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../Colors'
import { styles } from './styles';
import { useHelpFeedbackViewModel } from '../../viewmodels/HelpFeedbackViewModel';

interface FeedbackTabProps {
  vm: ReturnType<typeof useHelpFeedbackViewModel>;
}

const FeedbackTab: React.FC<FeedbackTabProps> = ({ vm }) => {
  const { problemTypes, selectedProblemType, setSelectedProblemType,
          feedbackText, setFeedbackText, showContactInfo, sendFeedback,
          showRatingDialog } = vm;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView style={styles.tabContent}>
        <Text style={styles.feedbackTitle}>
          Your opinion is important to us to improve Vitta!
        </Text>

        <Text style={styles.label}>Select the type of problem:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.problemTypesContainer}
        >
          {problemTypes.map(type => (
            <Chip
              key={type.id}
              icon={() => (
                <Icon
                  name={type.icon}
                  size={20}
                  color={
                    selectedProblemType?.id === type.id
                      ? COLORS.primary
                      : COLORS.textSecondary
                  }
                />
              )}
              selected={selectedProblemType?.id === type.id}
              onPress={() => setSelectedProblemType(type)}
              style={[
                styles.problemTypeChip,
                selectedProblemType?.id === type.id && styles.selectedProblemTypeChip,
              ]}
              textStyle={
                selectedProblemType?.id === type.id
                  ? styles.selectedChipText
                  : styles.chipText
              }
            >
              {type.label}
            </Chip>
          ))}
        </ScrollView>

        <Text style={styles.label}>Details:</Text>
        <TextInput
          value={feedbackText}
          onChangeText={setFeedbackText}
          placeholder="Describe your problem or suggestion in detail..."
          multiline
          numberOfLines={3}
          mode="outlined"
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          style={styles.feedbackInput}
        />
        <Button
          mode="contained"
          onPress={() => sendFeedback()}
          style={styles.sendButton}
          buttonColor={COLORS.primary}
        >
          Send Feedback
        </Button>

        <View style={styles.rateSection}>
          <Text style={styles.rateTitle}>Rate Vitta</Text>
          <Button
            mode="outlined"
            icon="star"
            onPress={showRatingDialog}
            style={styles.rateButton}
            textColor={COLORS.primary}
          >
            Give a note
          </Button>
        </View>
        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FeedbackTab;
