import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { COLORS } from '../Colors';

const PrivacyPolicyScreen: React.FC = () => {
  return (
    <>
      {/* Cabeçalho com Appbar */}
      <Appbar.Header style={{ backgroundColor: COLORS.primary }}>
        <Appbar.Content 
          title="Política de Privacidade" 
          titleStyle={{ color: COLORS.textOnPrimary }} 
        />
      </Appbar.Header>

      {/* Conteúdo rolável */}
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Tratamento de Dados Pessoais</Title>
            <Paragraph style={styles.paragraph}>
              Nosso aplicativo utiliza o Firebase para autenticação e o Firestore para armazenar os dados necessários à personalização da sua experiência. Todas as informações são tratadas com alto nível de segurança e em conformidade com as normas de proteção de dados.
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Integramos as APIs da Spoonacular e da Nutritionix para fornecer informações nutricionais e de receitas. Esses dados são obtidos diretamente dos serviços e não são armazenados em nossos servidores, sendo utilizados exclusivamente para apresentar resultados precisos aos nossos usuários.
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Desenvolvido com React Native e TypeScript, nosso aplicativo foi projetado para oferecer uma experiência moderna, intuitiva e segura. Caso tenha dúvidas sobre o tratamento de seus dados, entre em contato conosco.
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: COLORS.shadow,
    elevation: 3,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  paragraph: {
    color: COLORS.textSecondary,
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;
