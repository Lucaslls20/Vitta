import React, { useContext } from 'react';
import { View, ScrollView, StatusBar, Image } from 'react-native';
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
import { LogoutView } from '../../Components/LogOut';
import { ThemeContext } from '../theme';
import { darkTheme, lightTheme } from '../Context';

const Settings = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isDarkMode } = useContext(ThemeContext);

  // Obtém os dados do ViewModel
  const { user, loading, settings, toggleDarkMode, toggleNotifications } = useSettingsViewModel();

  // Determinar as cores com base no tema atual
  const theme = isDarkMode ? darkTheme : lightTheme;
  const backgroundColor = theme.background;
  const textColor = theme.text;
  const surfaceColor = theme.surface;

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
          title="Configurações"
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
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s',
              }}
              style={[styles.userAvatar, { width: 80, height: 80, borderRadius: 40 }]}
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: textColor }]}>
                {user?.displayName || 'Nome do Usuário'}
              </Text>
              <Text style={[styles.profileEmail, { color: textColor }]}>
                {user?.email || 'usuario@example.com'}
              </Text>
              <Button
                mode="text"
                compact
                icon="account-edit"
                labelStyle={styles.editProfileLabel}
                style={styles.editProfileButton}
                onPress={() => navigation.navigate('EditProfile')}
              >
                Editar perfil
              </Button>
            </View>
          </View>
        </Surface>

        {/* Categorias de Configurações */}
        <Surface style={[styles.settingsCard, { backgroundColor: surfaceColor }]}>
          {/* Seção de Aparência */}
          <List.Section>
            <List.Subheader style={[styles.sectionHeader, { color: textColor }]}>Aparência</List.Subheader>
            <List.Item
              title="Modo Escuro"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              left={(props) => (
                <List.Icon {...props} icon="brightness-4" color={COLORS.primary} />
              )}
              right={() => (
                <Switch
                  value={settings.darkMode}
                  onValueChange={toggleDarkMode}
                />
              )}
            />
          </List.Section>
          <Divider style={styles.divider} />

          {/* Seção de Notificações */}
          <List.Section>
            <List.Subheader style={[styles.sectionHeader, { color: textColor }]}>Notificações</List.Subheader>
            <List.Item
              title="Notificações Push"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              description="Receba notificações sobre atualizações e novidades"
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
              title="Termos e Condições"
              titleStyle={[styles.listItemTitle, { color: textColor }]}
              description="Leia sobre os termos e condições do aplicativo."
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
              title="Política de Privacidade"
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
              title="Ajuda e Feedback"
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
              title="Sobre o App"
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