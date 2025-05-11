// ViewModel: HelpFeedbackViewModel.ts
import { useState } from 'react';
import { db, auth } from '../Services/firebaseConfig';
import {
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Feedback,
  ProblemType,
  FAQ,
} from '../Models/HelpFeedbackModel';

/**
 * ViewModel para a tela de Help & Feedback.
 */
export const useHelpFeedbackViewModel = () => {
  // Estados de UI
  const [activeTab, setActiveTab] = useState<'Help' | 'Feedback'>('Help');
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedProblemType, setSelectedProblemType] = useState<
    ProblemType | undefined
  >(undefined);
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  // Rating
  const [ratingDialogVisible, setRatingDialogVisible] = useState(false);
  const [rating, setRating] = useState(0);

  // Mensagens de erro/sucesso
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Diálogos de estado
  const [dialogs, setDialogs] = useState({
    error: false,
    success: false,
    contact: false,
    attachment: false,
  });

  // Dados de contato/anexo
  const [contactInfo, setContactInfo] = useState({
    title: '',
    message: '',
  });

   /** Exibe o diálogo de avaliação */
  const showRatingDialog = () => setRatingDialogVisible(true);

  /** Oculta o diálogo de avaliação */
  const hideRatingDialog = () => setRatingDialogVisible(false);

  /** Lista estática de tipos de problema. */
  const problemTypes: ProblemType[] = [
    { id: 1, label: 'Application error', icon: 'alert-circle' },
    { id: 2, label: 'Performance issue', icon: 'speedometer-slow' },
    { id: 3, label: 'Improvement suggestion', icon: 'lightbulb-on' },
    { id: 4, label: 'Account problem', icon: 'account-question' },
    { id: 5, label: 'Another problem', icon: 'help-circle' },
  ];

  /** Lista estática de FAQs. */
  const faqs: FAQ[] = [
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

  /**
   * Envia feedback para o Firestore.
   */
  const sendFeedback = async () => {
    if (!selectedProblemType) {
      setErrorMessage('Please select a problem type.');
      setDialogs(prev => ({ ...prev, error: true }));
      return;
    }
    if (feedbackText.trim().length < 10) {
      setErrorMessage(
        'Please provide more details about your problem or suggestion.'
      );
      setDialogs(prev => ({ ...prev, error: true }));
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado.');

      const feedbackRef = collection(db, 'feedbacks');
      const newFeedback: Feedback = {
        userId: user.uid,
        problemType: selectedProblemType,
        details: feedbackText.trim(),
        createdAt: serverTimestamp() as Timestamp,
        attachmentUrl: undefined,
        rating: rating || undefined,
      };

      await addDoc(feedbackRef, newFeedback);

      setSuccessMessage(
        'Thank you for helping us improve Vitta! Your feedback has been successfully sent.'
      );
      setDialogs(prev => ({ ...prev, success: true }));

      // reset state
      setFeedbackText('');
      setSelectedProblemType(undefined);
      setRating(0);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error sending feedback.');
      setDialogs(prev => ({ ...prev, error: true }));
    }
  };

  // Adicionar no ViewModel
const sendRating = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado.');
    
    const ratingsRef = collection(db, 'ratings');
    await addDoc(ratingsRef, {
      userId: user.uid,
      rating: rating,
      createdAt: serverTimestamp() as Timestamp,
    });
    
    hideRatingDialog();
    // Mostrar mensagem de sucesso se necessário
  } catch (error) {
   console .error('Error sending rating:', error);
    setErrorMessage('Error sending rating.');
    setDialogs(prev => ({ ...prev, error: true }));
  }
};

  /**
   * Manipula título e mensagem dos diálogos de contato/anexo.
   */
  const showContactInfo = (type: 'email' | 'chat' | 'attachment') => {
    let title = '';
    let message = '';
    switch (type) {
      case 'email':
        title = 'Contact';
        message = 'Send an email to suporte@vitta.com';
        break;
      case 'chat':
        title = 'Chat';
        message = `Support chat is available Monday through Friday, 8am to 6pm.

        For chat support, please email chat@vitta.com`;
        break;
      case 'attachment':
        title = 'Attachment';
        message = 'Attachment functionality will be implemented soon.';
        break;
    }
    setContactInfo({ title, message });
    setDialogs(prev => ({ ...prev, contact: true }));
  };

  /** Funções para fechar diálogos */
  const hideErrorDialog = () => setDialogs(prev => ({ ...prev, error: false }));
  const hideSuccessDialog = () =>
    setDialogs(prev => ({ ...prev, success: false }));
  const hideContactDialog = () =>
    setDialogs(prev => ({ ...prev, contact: false }));
  const hideAttachmentDialog = () =>
    setDialogs(prev => ({ ...prev, attachment: false }));


   return {
    // estados
    activeTab,
    feedbackText,
    selectedProblemType,
    selectedFAQ,
    ratingDialogVisible,
    rating,
    errorMessage,
    successMessage,
    dialogs,
    contactInfo,
    // listas
    problemTypes,
    faqs,
    // actions
    setActiveTab,
    setFeedbackText,
    setSelectedProblemType,
    setSelectedFAQ,
    setRating,
    sendFeedback,
    showContactInfo,
    showRatingDialog,
    hideErrorDialog,
    hideSuccessDialog,
    hideContactDialog,
    hideAttachmentDialog,
    hideRatingDialog,
    sendRating
  };
};
