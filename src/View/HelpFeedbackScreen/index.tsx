import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
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
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Colors';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../App';
import {useHelpFeedbackViewModel} from '../../ViewModels/HelpFeedbackViewModel';

const HelpFeedbackScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    activeTab,
    sendRating,
    setActiveTab,
    feedbackText,
    setFeedbackText,
    selectedProblemType,
    setSelectedProblemType,
    selectedFAQ,
    setSelectedFAQ,
    ratingDialogVisible,
    rating,
    errorMessage,
    successMessage,
    dialogs,
    contactInfo,
    problemTypes,
    faqs,
    sendFeedback,
    showContactInfo,
    showRatingDialog,
    hideErrorDialog,
    hideSuccessDialog,
    hideContactDialog,
    hideAttachmentDialog,
    hideRatingDialog,
    setRating,
  } = useHelpFeedbackViewModel();

  const renderStar = (starNumber: number) => (
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
            style={styles.faqAnswerContainer}
          />
        </List.Accordion>
      ))}

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Still need Help?</Text>
        <Button
          mode="contained"
          icon="email"
          onPress={() => showContactInfo('email')}
          style={styles.contactButton}
          buttonColor={COLORS.primary}>
          Contact by Email
        </Button>
        <Button
          mode="outlined"
          icon="chat"
          onPress={() => showContactInfo('chat')}
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
                selectedProblemType?.id === type.id &&
                  styles.selectedProblemTypeChip,
              ]}
              textStyle={
                selectedProblemType?.id === type.id
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
          onPress={() => showContactInfo('attachment')}>
          <Icon name="paperclip" size={24} color={COLORS.primary} />
          <Text style={styles.attachmentButtonText}>Add Annex</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={sendFeedback}
          style={styles.sendButton}
          buttonColor={COLORS.primary}>
          Send Feedback
        </Button>

        <View style={styles.rateSection}>
          <Text style={styles.rateTitle}>Rate Vitta</Text>
          <Button
            mode="outlined"
            icon="star"
            onPress={showRatingDialog} // chama exibição do diálogo
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Arrow name="arrow-back-ios" size={25} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help and Feedback</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Help' && styles.activeTab]}
          onPress={() => setActiveTab('Help')}>
          <Icon
            name="help-circle"
            size={24}
            color={activeTab === 'Help' ? COLORS.primary : COLORS.textSecondary}
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
          style={[styles.tab, activeTab === 'Feedback' && styles.activeTab]}
          onPress={() => setActiveTab('Feedback')}>
          <Icon
            name="message-text"
            size={24}
            color={
              activeTab === 'Feedback' ? COLORS.primary : COLORS.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Feedback' && styles.activeTabText,
            ]}>
            Feedback
          </Text>
        </TouchableOpacity>
      </View>

      <Divider />

      {/* Conteúdo da aba selecionada */}
      {activeTab === 'Help' ? renderHelpTab() : renderFeedbackTab()}

      {/* Todos os Diálogos */}
      <Portal>
        {/* Rating Dialog */}
        <Dialog
          visible={ratingDialogVisible}
          onDismiss={hideRatingDialog}
          style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>
            Rate your experience
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              How satisfied are you with Vitta?
            </Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(renderStar)}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideRatingDialog} textColor={COLORS.textSecondary}>
              Cancel
            </Button>
            <Button
              onPress={sendRating}
              disabled={rating === 0}
              textColor={COLORS.primary}>
              Send
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Error Dialog */}
        <Dialog
          visible={dialogs.error}
          onDismiss={hideErrorDialog}
          style={styles.dialog}>
          <Dialog.Title style={[styles.dialogTitle, {color: COLORS.error}]}>
            Error
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>{errorMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideErrorDialog} textColor={COLORS.primary}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Success Dialog */}
        <Dialog
          visible={dialogs.success}
          onDismiss={hideSuccessDialog}
          style={styles.dialog}>
          <Dialog.Title style={[styles.dialogTitle, {color: COLORS.success}]}>
            Success
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>{successMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideSuccessDialog} textColor={COLORS.primary}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Contact Dialog */}
        <Dialog
          visible={dialogs.contact}
          onDismiss={hideContactDialog}
          style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>
            {contactInfo.title}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>{contactInfo.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideContactDialog} textColor={COLORS.primary}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Attachment Dialog */}
        <Dialog
          visible={dialogs.attachment}
          onDismiss={hideAttachmentDialog}
          style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>
            {contactInfo.title}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>{contactInfo.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideAttachmentDialog} textColor={COLORS.primary}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default HelpFeedbackScreen;
