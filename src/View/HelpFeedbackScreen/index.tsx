// HelpFeedbackScreen.tsx
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Text,
  Surface,
  TextInput,
  Button,
  Divider,
  List,
  Chip,
  Portal,
  Dialog,
  RadioButton,
  IconButton,
} from 'react-native-paper';
// Alterar a importação do ícone para:
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Colors';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../App';

// Tipos de problemas que o usuário pode selecionar
const problemTypes = [
  {id: 1, label: 'Application error', icon: 'alert-circle'},
  {id: 2, label: 'Performance issue', icon: 'speedometer-slow'},
  {id: 3, label: 'Improvement suggestion', icon: 'lightbulb-on'},
  {id: 4, label: 'Account problem', icon: 'account-question'},
  {id: 5, label: 'Another problem', icon: 'help-circle'},
];

// FAQs comuns
const faqs = [
  {
    id: 1,
    question: 'How do I change my personal information?',
    answer:
      'Access your profile by clicking on the icon in the bottom right corner of the screen. Then tap on "Edit Profile" to modify your personal information.',
  },
  {
    id: 2,
    question: 'How to sync data with other devices?',
    answer:
      "Vitta automatically syncs your data when you're connected to the internet. Make sure you're using the same account on all your devices.",
  },
  {
    id: 3,
    question: 'Can I delete my app data?',
    answer:
      'Yes, you can delete specific data or your entire account. Go to "Settings > Privacy > Delete Data" for these options.',
  },
  {
    id: 4,
    question: 'How do I track my weekly progress?',
    answer:
      'On the Home screen, tap "Reports" to view graphs and statistics of your weekly, monthly, or yearly progress.',
  },
  {
    id: 5,
    question: 'Does the app work offline?',
    answer:
      'Yes, Vitta works offline for most functions. However, features like syncing and updates require an internet connection.',
  },
];

const HelpFeedbackScreen = () => {
  const [activeTab, setActiveTab] = useState<'Help' | 'feedback'>('Help');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [selectedProblemType, setSelectedProblemType] = useState<number | null>(
    null,
  );
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const navigation = useNavigation<NavigationProps>();

  const handleSendFeedback = () => {
    if (!selectedProblemType) {
      Alert.alert('Erro', 'Por favor, selecione um tipo de problema.');
      return;
    }

    if (feedbackText.trim().length < 10) {
      Alert.alert(
        'Erro',
        'Por favor, forneça mais detalhes sobre seu problema ou sugestão.',
      );
      return;
    }

    // Aqui você implementaria o envio do feedback para o backend
    Alert.alert(
      'Feedback enviado',
      'Obrigado por nos Helpr a melhorar o Vitta! Seu feedback foi enviado com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFeedbackText('');
            setSelectedProblemType(null);
          },
        },
      ],
    );
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const submitRating = () => {
    Alert.alert(
      'Avaliação enviada',
      `Obrigado por avaliar o Vitta com ${rating} estrelas!`,
    );
    hideDialog();
  };

  const renderStar = (starNumber: any) => {
    return (
      <TouchableOpacity
        key={starNumber}
        onPress={() => setRating(starNumber)}
        style={styles.starContainer}>
        <Icon
          name={rating >= starNumber ? 'star' : 'star-outline'}
          size={36}
          color={rating >= starNumber ? COLORS.tertiary : COLORS.textSecondary}
        />
      </TouchableOpacity>
    );
  };

  const renderHelpTab = () => (
    <ScrollView style={styles.tabContent}>
      <Surface style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search help..."
          mode="outlined"
          left={<TextInput.Icon icon="magnify" color={COLORS.textSecondary} />}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
        />
      </Surface>

      <Text style={styles.sectionTitle}>FAQ</Text>

      {faqs.map(faq => (
        <List.Accordion
          key={faq.id}
          title={faq.question}
          id={faq.id.toString()}
          titleStyle={styles.faqQuestion}
          expanded={selectedFAQ === faq.id}
          onPress={() => setSelectedFAQ(selectedFAQ === faq.id ? null : faq.id)}
          left={props => (
            <List.Icon
              {...props}
              icon="help-circle-outline"
              color={COLORS.primary}
            />
          )}>
          <List.Item
            title={faq.answer}
            titleNumberOfLines={10}
            titleStyle={styles.faqAnswer}
            style={styles.faqAnswerContainer}
          />
        </List.Accordion>
      ))}

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Ainda precisa de Help?</Text>
        <Button
          mode="contained"
          icon="email"
          onPress={() =>
            Alert.alert('Contact', 'Send an email to suporte@vitta.com')
          }
          style={styles.contactButton}
          buttonColor={COLORS.primary}>
          Contact by Email
        </Button>
        <Button
          mode="outlined"
          icon="chat"
          onPress={() =>
            Alert.alert(
              'Chat',
              'Support chat is available Monday through Friday, 8am to 6pm.',
            )
          }
          style={styles.contactButton}
          textColor={COLORS.primary}>
          Support Chat
        </Button>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );

  const renderFeedbackTab = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.tabContent}>
        <Text style={styles.feedbackTitle}>
        Your opinion is important to us to improve Vitta!
        </Text>

        <Text style={styles.label}>Select the type of problem:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.problemTypesContainer}>
          {problemTypes.map(type => (
            <Chip
              key={type.id}
              icon={() => (
                <Icon
                  name={type.icon}
                  size={20}
                  color={
                    selectedProblemType === type.id
                      ? COLORS.primary
                      : COLORS.textSecondary
                  }
                />
              )}
              selected={selectedProblemType === type.id}
              onPress={() => setSelectedProblemType(type.id)}
              style={[
                styles.problemTypeChip,
                selectedProblemType === type.id &&
                  styles.selectedProblemTypeChip,
              ]}
              textStyle={
                selectedProblemType === type.id
                  ? styles.selectedChipText
                  : styles.chipText
              }>
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
          numberOfLines={5}
          mode="outlined"
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          style={styles.feedbackInput}
        />

        <Text style={styles.optionalLabel}>
        Optional: Attach screenshot or video
        </Text>
        <TouchableOpacity
          style={styles.attachmentButton}
          onPress={() =>
            Alert.alert(
              'Annex',
              'Attachment functionality will be implemented soon.',
            )
          }>
          <Icon name="paperclip" size={24} color={COLORS.primary} />
          <Text style={styles.attachmentButtonText}>Add Annex</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={handleSendFeedback}
          style={styles.sendButton}
          buttonColor={COLORS.primary}>
          Send Feedback
        </Button>

        <View style={styles.rateSection}>
          <Text style={styles.rateTitle}>Rate Vitta</Text>
          <Button
            mode="outlined"
            icon="star"
            onPress={showDialog}
            style={styles.rateButton}
            textColor={COLORS.primary}>
            Give a note
          </Button>
        </View>

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={styles.dialog}>
            <Dialog.Title style={styles.dialogTitle}>
            Rate your experience
            </Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogText}>
              How satisfied are you with Vitta?
              </Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => renderStar(star))}
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} textColor={COLORS.textSecondary}>
                Cancel
              </Button>
              <Button
                onPress={submitRating}
                disabled={rating === 0}
                textColor={COLORS.primary}>
               Send
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Arrow name="arrow-back-ios" size={25} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help and Feedback</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Help' && styles.activeTab]}
          onPress={() => setActiveTab('Help')}>
          <Icon
            name="help-circle"
            size={24}
            color={
              activeTab === 'Help' ? COLORS.primary : COLORS.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Help' && styles.activeTabText,
            ]}>
            Help
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'feedback' && styles.activeTab]}
          onPress={() => setActiveTab('feedback')}>
          <Icon
            name="message-text"
            size={24}
            color={
              activeTab === 'feedback' ? COLORS.primary : COLORS.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'feedback' && styles.activeTabText,
            ]}>
            Feedback
          </Text>
        </TouchableOpacity>
      </View>

      <Divider />

      {activeTab === 'Help' ? renderHelpTab() : renderFeedbackTab()}
    </View>
  );
};

export default HelpFeedbackScreen;
