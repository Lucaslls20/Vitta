import React from 'react';
import { ScrollView, View } from 'react-native';
import { Surface, TextInput, Text, List, Button } from 'react-native-paper';
import { COLORS } from '../Colors';
import { styles } from './styles';
import { useHelpFeedbackViewModel } from '../../viewmodels/HelpFeedbackViewModel';

interface HelpTabProps {
  vm: ReturnType<typeof useHelpFeedbackViewModel>;
}

const HelpTab: React.FC<HelpTabProps> = ({ vm }) => {
  const { faqs, selectedFAQ, setSelectedFAQ, showContactInfo } = vm;

  return (
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
            <List.Icon {...props} icon="help-circle-outline" color={COLORS.primary} />
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
          buttonColor={COLORS.primary}
        >
          Contact by Email
        </Button>
        <Button
          mode="outlined"
          icon="chat"
          onPress={() => showContactInfo('chat')}
          style={styles.contactButton}
          textColor={COLORS.primary}
        >
          Support Chat
        </Button>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default HelpTab;