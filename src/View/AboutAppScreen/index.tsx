// src/screens/AboutScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
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
  Snackbar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../Colors';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAboutViewModel } from '../../ViewModels/AboutAppViewModel';
import { RefreshControl } from 'react-native';

const AboutScreen = () => {
  const {
    appInfo,
    contactInfo,
    isLoading,
    error,
    handleOpenLink,
    handleSendEmail,
    handleOpenStore,
    refreshData
  } = useAboutViewModel();

  const navigation = useNavigation<NavigationProps>();
  const [errorVisible, setErrorVisible] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  useEffect(() => {
    // Mostrar mensagem de erro quando ocorrer
    if (error) {
      setErrorVisible(true);
    }
  }, [error]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshData();
    // Aguarda um tempo para dar feedback visual ao usuário
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshData]);

  // Função para abrir links externos
  const openLink = (url: string) => {
    const processedUrl = handleOpenLink(url);
    Linking.openURL(processedUrl).catch(err => console.error('Erro ao abrir link', err));
  };
  
  // Função para abrir email
  const openEmail = () => {
    const emailAddress = handleSendEmail();
    Linking.openURL(`mailto:${emailAddress}`).catch(err => 
      console.error('Erro ao abrir email', err));
  };
  
  // Função para abrir loja de aplicativos
  const openStore = () => {
    const storeUrl = handleOpenStore();
    Linking.openURL(storeUrl).catch(err => 
      console.error('Erro ao abrir loja', err));
  };

  if (isLoading && !appInfo) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 16 }}>Carregando informações...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }>
        <Surface style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={25} color={COLORS.white} />
          </TouchableOpacity>

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
            <Text style={styles.description}>{appInfo?.description}</Text>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="account"
                size={20}
                color={COLORS.textPrimary}
              />
              <Text style={styles.infoText}>
                Developed by: {appInfo?.developer}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar-refresh"
                size={20}
                color={COLORS.textPrimary}
              />
              <Text style={styles.infoText}>
                Last update: {appInfo?.lastUpdate}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color={COLORS.textPrimary}
              />
              <Text style={styles.infoText}>
                Contact email: suporte@vitta.com
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {appInfo?.features.map((feature, index) => (
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
            {appInfo?.apiProviders.map((provider, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openLink(provider.link)}
                style={styles.apiItem}>
                <Avatar.Icon
                  size={40}
                  icon={provider.icon}
                  color={COLORS.textOnPrimary}
                  style={{ backgroundColor: COLORS.primary }}
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
            onPress={openEmail}
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            labelStyle={{ color: COLORS.textOnPrimary }}>
            Contact
          </Button>

          <Button
            mode="contained"
            icon="star"
            onPress={openStore}
            style={[styles.button, { backgroundColor: COLORS.tertiary }]}
            labelStyle={{ color: COLORS.text.primary }}>
            Rate
          </Button>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.copyright}>
            © 2025 All rights reserved
          </Text>
          <Text style={styles.appVersion}>Version {appInfo?.version}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
            <Text style={styles.privacyLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <Snackbar
        visible={errorVisible}
        onDismiss={() => setErrorVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setErrorVisible(false),
        }}
        duration={3000}>
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};

export default AboutScreen;