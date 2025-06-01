import React, { useContext } from 'react';
import { View, ScrollView, StatusBar, Image, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import {
  Appbar,
  List,
  Switch,
  Divider,
  Text,
  Button,
  Surface,
  IconButton,
} from 'react-native-paper';
import { COLORS } from '../Colors';
import { NavigationProps } from '../../App';
import { useNavigation } from '@react-navigation/native';
import useSettingsViewModel from '../../ViewModels/DarkModeViewModel';
import useProfileViewModel from '../../ViewModels/SettingsViewModel';
import { LogoutView } from '../../Components/LogOut';
import { ThemeContext } from '../theme';
import { darkTheme, lightTheme } from '../Context';

const Settings = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isDarkMode } = useContext(ThemeContext);

  // Obtém os dados do ViewModel
  const { user: profileUser, loading: profileLoading } = useProfileViewModel();
  const { settings, toggleDarkMode, toggleNotifications, loading: settingsLoading } = useSettingsViewModel();

  const loading = profileLoading || settingsLoading;

  // Determinar as cores com base no tema atual
  const theme = isDarkMode ? darkTheme : lightTheme;
  const backgroundColor = theme.background;
  const textColor = theme.text;
  const surfaceColor = theme.surface;

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }


  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          color={COLORS.textOnPrimary}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="Settings"
          titleStyle={styles.appbarTitle}
          color={COLORS.textOnPrimary}
        />
        <Appbar.Action
          icon="help-circle-outline"
          color={COLORS.textOnPrimary}
          onPress={() => navigation.navigate('HelpFeedbackScreen')}
        />
      </Appbar.Header>
      <ScrollView style={[styles.scrollView, { backgroundColor }]} showsVerticalScrollIndicator={false}>
        {/* Seção de Perfil */}
        <Surface style={[styles.profileCard, { backgroundColor: surfaceColor }]}>
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D',
              }}
              style={[styles.userAvatar, { width: 80, height: 80, borderRadius: 40 }]}
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: textColor }]}>
              {profileUser?.displayName.toUpperCase() || 'Usuário'}
              </Text>
              <Text style={[styles.profileEmail, { color: textColor }]}>
              {profileUser?.email || ''}
              </Text>
              <Button
                mode="text"
                compact
                icon="account-edit"
                labelStyle={styles.editProfileLabel}
                style={styles.editProfileButton}
                onPress={() => navigation.navigate('EditProfile')}
              >
                Edit Profile
              </Button>
            </View>
          </View>
        </Surface>

        {/* Categorias de Configurações */}
        <Surface style={[styles.settingsCard, { backgroundColor: surfaceColor }]}>
          {/* Seção de Aparência */}
          <Divider style={styles.divider} />

          {/* Seção de Notificações */}
          <List.Section>
            <List.Subheader style={[styles.sectionHeader, { color: textColor }]}>Notifications</List.Subheader>
            <List.Item
              title="Push Notifications"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              description="Receive notifications about updates and news"
              descriptionStyle={[styles.listItemDescription, { color: isDarkMode ? '#ccc' : COLORS.textSecondary }]}
              left={(props) => (
                <List.Icon {...props} icon="bell" color={COLORS.primary} />
              )}
              right={() => (
                <Switch
                  value={settings.notifications}
                  onValueChange={toggleNotifications}
                />
              )}
            />
          </List.Section>
          <Divider style={styles.divider} />

          {/* Seção de Privacidade */}
          <List.Section>
            <List.Subheader style={[styles.sectionHeader, { color: textColor }]}>Privacidade</List.Subheader>
            <List.Item
              title="Terms and Conditions"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              description="Read about the terms and conditions of the app"
              descriptionStyle={[styles.listItemDescription, { color: isDarkMode ? '#ccc' : COLORS.textSecondary }]}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="file-document-multiple-outline"
                  color={COLORS.primary}
                />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  iconColor={isDarkMode ? '#ccc' : COLORS.textSecondary}
                />
              )}
            />
            <List.Item
              title="Privacy Policy"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              left={(props) => (
                <List.Icon {...props} icon="shield-account" color={COLORS.primary} />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  iconColor={isDarkMode ? '#ccc' : COLORS.textSecondary}
                />
              )}
              onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            />
          </List.Section>
        </Surface>

        {/* Seção de Suporte */}
        <Surface style={[styles.settingsCard, { backgroundColor: surfaceColor }]}>
          <List.Section>
            <List.Subheader style={[styles.sectionHeader, { color: textColor }]}>Suporte</List.Subheader>
            <List.Item
              title="Help & Feedback"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              left={(props) => (
                <List.Icon {...props} icon="help-circle" color={COLORS.primary} />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  iconColor={isDarkMode ? '#ccc' : COLORS.textSecondary}
                />
              )}
              onPress={() => navigation.navigate('HelpFeedbackScreen')}
            />
            <List.Item
              title="About the App"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              description="Versão 1.0.0"
              descriptionStyle={[styles.listItemDescription, { color: isDarkMode ? '#ccc' : COLORS.textSecondary }]}
              left={(props) => (
                <List.Icon {...props} icon="information" color={COLORS.primary} />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  iconColor={isDarkMode ? '#ccc' : COLORS.textSecondary}
                />
              )}
              onPress={() => navigation.navigate('AboutScreen')}
            />
          </List.Section>
        </Surface>
        <LogoutView />
      </ScrollView>
    </View>
  );
};

export default Settings;