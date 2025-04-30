import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Surface,
  Text,
  Divider,
  List,
  Button,
  Card,
  Avatar,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../Colors';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Tipo para informações do App
type AppInfo = {
  version: string;
  developer: string;
  lastUpdate: string;
  description: string;
  apiProviders: {
    name: string;
    description: string;
    link: string;
    icon: string;
  }[];
  features: string[];
};

// Dados do app
const appInfo: AppInfo = {
  version: '1.0',
  developer: 'Lucas Santos',
  lastUpdate: 'April 29, 2025',
  description:
    'Nutrition app that helps users track their daily food intake, find healthy recipes, and manage their nutritional goals.',
  apiProviders: [
    {
      name: 'Spoonacular',
      description: 'Recipe and Food Information API',
      link: 'https://spoonacular.com/food-api',
      icon: 'food-apple',
    },
    {
      name: 'Nutritionix',
      description: 'Detailed nutritional data',
      link: 'https://www.nutritionix.com/business/api',
      icon: 'nutrition',
    },
    {
      name: 'Firebase Firestore',
      description: 'Cloud storage for user data',
      link: 'https://firebase.google.com/products/firestore',
      icon: 'firebase',
    },
  ],
  features: [
    'Healthy Recipe Search',
    'Daily Nutrition Tracker',
    'Food Nutrition Analysis',
    'Food Consumption History',
    'Personalized Suggestions',
    'Cloud Sync',
    'Offline Mode',
  ],
};

const AboutScreen = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Erro ao abrir link', err));
  };

  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Surface style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={25} color={COLORS.white} />
          </TouchableOpacity>

          {/* Se quiser manter o logo ao lado do título */}
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfcO17XePJif2nP1vqYnvm9FlExVd0D06BA&s',
              }}
              style={styles.logo}
              defaultSource={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfcO17XePJif2nP1vqYnvm9FlExVd0D06BA&s',
              }}
            />
          </View>

          <Text style={styles.appName}>Vitta</Text>
        </Surface>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>About the App</Text>
            <Text style={styles.description}>{appInfo.description}</Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="account"
                size={20}
                color={COLORS.textPrimary}
              />
              <Text style={styles.infoText}>
              Developed by: {appInfo.developer}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar-refresh"
                size={20}
                color={COLORS.textPrimary}
              />
              <Text style={styles.infoText}>
              Last update: {appInfo.lastUpdate}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {appInfo.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={COLORS.success}
                />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Technologies Used</Text>
            {appInfo.apiProviders.map((provider, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openLink(provider.link)}
                style={styles.apiItem}>
                <Avatar.Icon
                  size={40}
                  icon={provider.icon}
                  color={COLORS.textOnPrimary}
                  style={{backgroundColor: COLORS.primary}}
                />
                <View style={styles.apiDetails}>
                  <Text style={styles.apiName}>{provider.name}</Text>
                  <Text style={styles.apiDescription}>
                    {provider.description}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="open-in-new"
                  size={20}
                  color={COLORS.accent}
                />
              </TouchableOpacity>
            ))}
          </Card.Content>
        </Card>

        <View style={styles.bottomButtonsContainer}>
          <Button
            mode="contained"
            icon="email"
            onPress={() => openLink('mailto:contato@seuapp.com')}
            style={[styles.button, {backgroundColor: COLORS.primary}]}
            labelStyle={{color: COLORS.textOnPrimary}}>
           Contact
          </Button>

          <Button
            mode="contained"
            icon="star"
            onPress={() => openLink('market://details?id=com.seuapp.id')}
            style={[styles.button, {backgroundColor: COLORS.tertiary}]}
            labelStyle={{color: COLORS.text.primary}}>
            Rate
          </Button>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.copyright}>
            © 2025 All rights reserved
          </Text>
          <Text style={styles.appVersion}>Version {appInfo.version}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
            <Text style={styles.privacyLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
