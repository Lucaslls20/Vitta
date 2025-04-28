// HelpFeedbackScreen.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Alert, 
  Platform,
  KeyboardAvoidingView
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
  IconButton
} from 'react-native-paper';
// Alterar a importação do ícone para:
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../Colors';
import { styles } from './styles';

// Tipos de problemas que o usuário pode selecionar
const problemTypes = [
  { id: 1, label: 'Erro no aplicativo', icon: 'alert-circle' },
  { id: 2, label: 'Problema de desempenho', icon: 'speedometer-slow' },
  { id: 3, label: 'Sugestão de melhoria', icon: 'lightbulb-on' },
  { id: 4, label: 'Problema com conta', icon: 'account-question' },
  { id: 5, label: 'Outro', icon: 'help-circle' },
];

// FAQs comuns
const faqs = [
  { 
    id: 1, 
    question: 'Como alterar minhas informações pessoais?', 
    answer: 'Acesse o seu perfil clicando no ícone no canto inferior direito da tela. Em seguida, toque em "Editar Perfil" para modificar suas informações pessoais.'
  },
  { 
    id: 2, 
    question: 'Como sincronizar dados com outros dispositivos?', 
    answer: 'O Vitta sincroniza automaticamente seus dados quando você está conectado à internet. Verifique se você está usando a mesma conta em todos os dispositivos.'
  },
  { 
    id: 3, 
    question: 'Posso excluir meus dados do aplicativo?', 
    answer: 'Sim, você pode excluir dados específicos ou sua conta completa. Acesse "Configurações > Privacidade > Excluir Dados" para obter essas opções.'
  },
  { 
    id: 4, 
    question: 'Como acompanhar meu progresso semanal?', 
    answer: 'Na tela inicial, toque em "Relatórios" para visualizar gráficos e estatísticas do seu progresso semanal, mensal ou anual.'
  },
  { 
    id: 5, 
    question: 'O aplicativo funciona offline?', 
    answer: 'Sim, o Vitta funciona offline para a maioria das funções. No entanto, recursos como sincronização e atualizações requerem conexão com a internet.'
  },
];

const HelpFeedbackScreen = () => {
    const [activeTab, setActiveTab] = useState<'ajuda' | 'feedback'>('ajuda');
    const [feedbackText, setFeedbackText] = useState<string>('');
    const [selectedProblemType, setSelectedProblemType] = useState<number | null>(null);
    const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
  const handleSendFeedback = () => {
    if (!selectedProblemType) {
      Alert.alert('Erro', 'Por favor, selecione um tipo de problema.');
      return;
    }

    if (feedbackText.trim().length < 10) {
      Alert.alert('Erro', 'Por favor, forneça mais detalhes sobre seu problema ou sugestão.');
      return;
    }

    // Aqui você implementaria o envio do feedback para o backend
    Alert.alert(
      'Feedback enviado',
      'Obrigado por nos ajudar a melhorar o Vitta! Seu feedback foi enviado com sucesso.',
      [
        { 
          text: 'OK', 
          onPress: () => {
            setFeedbackText('');
            setSelectedProblemType(null);
          }
        }
      ]
    );
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const submitRating = () => {
    Alert.alert('Avaliação enviada', `Obrigado por avaliar o Vitta com ${rating} estrelas!`);
    hideDialog();
  };

  const renderStar = (starNumber: any) => {
    return (
      <TouchableOpacity
        key={starNumber}
        onPress={() => setRating(starNumber)}
        style={styles.starContainer}
      >
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
          placeholder="Pesquisar ajuda..."
          mode="outlined"
          left={<TextInput.Icon icon="magnify" color={COLORS.textSecondary} />}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
        />
      </Surface>

      <Text style={styles.sectionTitle}>Perguntas frequentes</Text>
      
      {faqs.map((faq) => (
        <List.Accordion
          key={faq.id}
          title={faq.question}
          id={faq.id.toString()}
          titleStyle={styles.faqQuestion}
          expanded={selectedFAQ === faq.id}
          onPress={() => setSelectedFAQ(selectedFAQ === faq.id ? null : faq.id)}
          left={props => <List.Icon {...props} icon="help-circle-outline" color={COLORS.primary} />}
        >
          <List.Item
            title={faq.answer}
            titleNumberOfLines={10}
            titleStyle={styles.faqAnswer}
            style={styles.faqAnswerContainer}
          />
        </List.Accordion>
      ))}

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Ainda precisa de ajuda?</Text>
        <Button 
          mode="contained" 
          icon="email" 
          onPress={() => Alert.alert('Contato', 'Envie um email para suporte@vitta.com')}
          style={styles.contactButton}
          buttonColor={COLORS.primary}
        >
          Contato por Email
        </Button>
        <Button 
          mode="outlined" 
          icon="chat" 
          onPress={() => Alert.alert('Chat', 'O chat de suporte está disponível de segunda a sexta, das 8h às 18h.')}
          style={styles.contactButton}
          textColor={COLORS.primary}
        >
          Chat de Suporte
        </Button>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );

  const renderFeedbackTab = () => (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView style={styles.tabContent}>
        <Text style={styles.feedbackTitle}>
          Sua opinião é importante para melhorarmos o Vitta!
        </Text>

        <Text style={styles.label}>Selecione o tipo de problema:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.problemTypesContainer}>
          {problemTypes.map((type) => (
            <Chip
            key={type.id}
            icon={() => (
              <Icon 
                name={type.icon} 
                size={20} 
                color={selectedProblemType === type.id ? COLORS.primary : COLORS.textSecondary}
              />
            )}
            selected={selectedProblemType === type.id}
            onPress={() => setSelectedProblemType(type.id)}
            style={[
              styles.problemTypeChip,
              selectedProblemType === type.id && styles.selectedProblemTypeChip
            ]}
            textStyle={selectedProblemType === type.id ? styles.selectedChipText : styles.chipText}
          >
            {type.label}
          </Chip>
          ))}
        </ScrollView>

        <Text style={styles.label}>Detalhes:</Text>
        <TextInput
          value={feedbackText}
          onChangeText={setFeedbackText}
          placeholder="Descreva seu problema ou sugestão em detalhes..."
          multiline
          numberOfLines={5}
          mode="outlined"
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          style={styles.feedbackInput}
        />

        <Text style={styles.optionalLabel}>
          Opcional: Anexar captura de tela ou vídeo
        </Text>
        <TouchableOpacity
          style={styles.attachmentButton}
          onPress={() => Alert.alert('Anexo', 'Funcionalidade de anexo será implementada em breve.')}
        >
          <Icon name="paperclip" size={24} color={COLORS.primary} />
          <Text style={styles.attachmentButtonText}>Adicionar anexo</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={handleSendFeedback}
          style={styles.sendButton}
          buttonColor={COLORS.primary}
        >
          Enviar Feedback
        </Button>

        <View style={styles.rateSection}>
          <Text style={styles.rateTitle}>Avalie o Vitta</Text>
          <Button 
            mode="outlined" 
            icon="star" 
            onPress={showDialog}
            style={styles.rateButton}
            textColor={COLORS.primary}
          >
            Dar uma nota
          </Button>
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
            <Dialog.Title style={styles.dialogTitle}>Avalie sua experiência</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogText}>O quanto você está satisfeito com o Vitta?</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => renderStar(star))}
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} textColor={COLORS.textSecondary}>Cancelar</Button>
              <Button onPress={submitRating} disabled={rating === 0} textColor={COLORS.primary}>Enviar</Button>
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
        <Text style={styles.headerTitle}>Ajuda e Feedback</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ajuda' && styles.activeTab]}
          onPress={() => setActiveTab('ajuda')}
        >
          <Icon
            name="help-circle"
            size={24}
            color={activeTab === 'ajuda' ? COLORS.primary : COLORS.textSecondary}
          />
          <Text style={[
            styles.tabText,
            activeTab === 'ajuda' && styles.activeTabText
          ]}>
            Ajuda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'feedback' && styles.activeTab]}
          onPress={() => setActiveTab('feedback')}
        >
          <Icon
            name="message-text"
            size={24}
            color={activeTab === 'feedback' ? COLORS.primary : COLORS.textSecondary}
          />
          <Text style={[
            styles.tabText,
            activeTab === 'feedback' && styles.activeTabText
          ]}>
            Feedback
          </Text>
        </TouchableOpacity>
      </View>

      <Divider />

      {activeTab === 'ajuda' ? renderHelpTab() : renderFeedbackTab()}
    </View>
  );
};

export default HelpFeedbackScreen;