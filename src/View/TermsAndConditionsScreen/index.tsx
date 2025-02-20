import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';
import { styles } from './styles';
import { COLORS } from '../Colors';
import { Header } from '../../Components/TermsAndConditionsScreen/Header';
import { ClauseCard } from '../../Components/TermsAndConditionsScreen/ClauseCard';
import { AcceptButton } from '../../Components/TermsAndConditionsScreen/AcceptButton';

export const TermsAndConditionsScreen = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const navigation = useNavigation<NavigationProps>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const progress = (layoutMeasurement.height + contentOffset.y) / contentSize.height;
    setScrollProgress(progress);
    setIsScrolledToBottom(progress >= 0.95);
  };

  const handleAcceptAndContinue = () => {
    console.log('Terms accepted');
    // Adicionar lógica de navegação aqui
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onGoBack={handleGoBack} title=' Integration and Authentication Policies' />
      <ProgressBar
        progress={scrollProgress}
        color={COLORS.primary}
        style={styles.progressBar}
      />

      <ScrollView
        style={styles.scrollContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={styles.date}>Last updated: 02/18/2025</Text>

        <ClauseCard
          title="Authentication with Firebase"
          text="By using this application, you agree to the Firebase authentication terms. Firebase Authentication manages the access and security of your credentials, protecting your personal data in accordance with Google's security standards. We recommend that you read the Firebase Privacy Policy and Terms of Service for more details."
        />

        <ClauseCard
          title="Storage via Cloud Firestore"
          text="Information related to your account, preferences, and other data is stored in Cloud Firestore. By using this service, you agree that your data will be processed and stored securely, following Firestore's security guidelines and policies. For more information, please refer to the Firestore Terms of Service and Privacy Policy."
        />

        <ClauseCard
          title="Integration with the Spoonacular API"
          text="This application uses the Spoonacular API to provide nutritional information and recipes. By accessing this data, you agree to the terms of use and policies of the Spoonacular API. The information provided is for informational purposes and should be used in accordance with the guidelines and conditions established by Spoonacular."
        />

        <ClauseCard
          title="Integration with the Nutritionix API"
          text="In addition, this application uses the Nutritionix API to provide detailed information about nutrition and monitor food intake. By using this service, you agree to the Nutritionix terms of use and privacy policy. The information provided is for informational purposes and should be interpreted in accordance with the guidelines stipulated by the API."
        />
      </ScrollView>

      <AcceptButton
        onPress={handleAcceptAndContinue}
        disabled={isScrolledToBottom}
      />
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen