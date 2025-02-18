import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { styles } from './styles';

const TermsAndConditionsScreen = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleScrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleAcceptAndContinue = () => {
    console.log('Terms accepted');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Políticas de Integração e Autenticação</Title>
          <Paragraph style={styles.date}>Última atualização: 18/02/2025</Paragraph>
        </Card.Content>
      </Card>

      <ScrollView
        style={styles.scrollContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Política 1 - Firebase Authentication */}
        <Text style={styles.clauseTitle}>Autenticação com Firebase</Text>
        <Text style={styles.clauseText}>
          Ao utilizar este aplicativo, você concorda com os termos de autenticação do Firebase. 
          O Firebase Authentication gerencia o acesso e a segurança das suas credenciais, protegendo 
          seus dados pessoais de acordo com os padrões de segurança do Google. Recomendamos que você 
          leia a política de privacidade e os Termos de Serviço do Firebase para obter mais detalhes.
        </Text>

        {/* Política 2 - Cloud Firestore */}
        <Text style={styles.clauseTitle}>Armazenamento via Cloud Firestore</Text>
        <Text style={styles.clauseText}>
          As informações relacionadas à sua conta, preferências e outros dados são armazenadas no Cloud Firestore. 
          Ao utilizar este serviço, você concorda que seus dados serão processados e armazenados de forma segura, 
          seguindo as diretrizes e políticas de segurança do Firestore. Para mais informações, consulte os Termos de 
          Serviço e a política de privacidade do Firestore.
        </Text>

        {/* Política 3 - Spoonacular API */}
        <Text style={styles.clauseTitle}>Integração com a Spoonacular API</Text>
        <Text style={styles.clauseText}>
          Este aplicativo utiliza a Spoonacular API para fornecer informações nutricionais e receitas. 
          Ao acessar esses dados, você concorda com os termos de uso e políticas da Spoonacular API. 
          As informações fornecidas são para fins informativos e devem ser utilizadas em conformidade com as diretrizes 
          e condições estabelecidas pela Spoonacular.
        </Text>

        {/* Política 4 - Nutritionix API */}
        <Text style={styles.clauseTitle}>Integração com a Nutritionix API</Text>
        <Text style={styles.clauseText}>
          Além disso, este aplicativo utiliza a Nutritionix API para oferecer informações detalhadas sobre nutrição 
          e monitorar o consumo alimentar. Ao utilizar este serviço, você concorda com os termos de uso e a política 
          de privacidade da Nutritionix. As informações fornecidas são destinadas para fins informativos e devem ser 
          interpretadas conforme as diretrizes estipuladas pela API.
        </Text>
      </ScrollView>

      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={handleScrollToBottom}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Scroll to Bottom
        </Button>
        <Button
          mode="outlined"
          onPress={handleScrollToTop}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Scroll to Top
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={handleAcceptAndContinue}
        style={styles.acceptButton}
        labelStyle={styles.acceptButtonLabel}
      >
        Accept & Continue
      </Button>
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen;
