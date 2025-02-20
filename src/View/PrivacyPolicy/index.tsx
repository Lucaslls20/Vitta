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

export const PrivacyPolicyScreen = () => {
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
    console.log('Privacy policy accepted');
    // Adicione a lógica de navegação aqui
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onGoBack={handleGoBack} title='Privacy Policy' />
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
          title="Data Collection"
          text="We collect information to provide better services. This includes data you provide directly, such as name and email, and data collected automatically, such as usage details."
        />

        <ClauseCard
          title="Data Usage"
          text="Your data is used to personalize your experience, improve our services, and communicate with you. We do not share your data with third parties without your consent."
        />

        <ClauseCard
          title="Data Security"
          text="We implement security measures like encryption and access controls to protect your data. However, no system is completely secure, and you should also take steps to protect your information."
        />

        <ClauseCard
          title="Third-Party Services"
          text="Our app integrates with third-party services (e.g., Firebase, APIs). These services have their own privacy policies, and we recommend reviewing them."
        />
      </ScrollView>

      <AcceptButton
        onPress={handleAcceptAndContinue}
        disabled={isScrolledToBottom}
      />
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;