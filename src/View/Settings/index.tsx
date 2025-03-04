import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Image } from 'react-native';
import { styles } from './styles';
import {
  Appbar,
  List,
  Switch,
  Divider,
  Text,
  Button,
  Dialog,
  Portal,
  Provider as PaperProvider,
  IconButton,
  Surface
} from 'react-native-paper';
import { COLORS } from '../Colors';
import { NavigationProps } from '../../App';
import { useNavigation } from '@react-navigation/native';
import useSettingsViewModel from '../../ViewModels/SettingsViewModel'; // Atualize o caminho conforme necessário
import { LogoutView } from '../../Components/LogOut';

const Settings = () => {
  const { user, loading } = useSettingsViewModel();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotifications(!notifications);
  const toggleLocationServices = () => setLocationServices(!locationServices);

  const showLogoutDialog = () => setLogoutDialogVisible(true);
  const hideLogoutDialog = () => setLogoutDialogVisible(false);

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    hideLogoutDialog();
    // Navegar para tela de login ou realizar outras ações necessárias
  };

  return (
    <PaperProvider>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.container}>
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
            onPress={() => {}}
          />
        </Appbar.Header>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Seção de Perfil */}
          <Surface style={styles.profileCard}>
            <View style={styles.profileSection}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s' }}
                style={[styles.userAvatar, { width: 80, height: 80, borderRadius: 40 }]}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.displayName || 'Nome do Usuário'}
                </Text>
                <Text style={styles.profileEmail}>
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
          <Surface style={styles.settingsCard}>
            {/* Seção de Aparência */}
            <List.Section>
              <List.Subheader style={styles.sectionHeader}>Aparência</List.Subheader>
              <List.Item
                title="Modo Escuro"
                titleStyle={styles.listItemTitle}
                left={props => <List.Icon {...props} icon="brightness-4" color={COLORS.primary} />}
                right={props => <Switch value={darkMode} onValueChange={toggleDarkMode} color={COLORS.primary} />}
              />
            </List.Section>
            <Divider style={styles.divider} />

            {/* Seção de Notificações */}
            <List.Section>
              <List.Subheader style={styles.sectionHeader}>Notificações</List.Subheader>
              <List.Item
                title="Notificações Push"
                titleStyle={styles.listItemTitle}
                description="Receba notificações sobre atualizações e novidades"
                descriptionStyle={styles.listItemDescription}
                left={props => <List.Icon {...props} icon="bell" color={COLORS.primary} />}
                right={props => <Switch value={notifications} onValueChange={toggleNotifications} color={COLORS.primary} />}
              />
            </List.Section>
            <Divider style={styles.divider} />

            {/* Seção de Privacidade */}
            <List.Section>
              <List.Subheader style={styles.sectionHeader}>Privacidade</List.Subheader>
              <List.Item
                title="Serviços de Localização"
                titleStyle={styles.listItemTitle}
                description="Permita que o app acesse sua localização"
                descriptionStyle={styles.listItemDescription}
                left={props => <List.Icon {...props} icon="map-marker" color={COLORS.primary} />}
                right={props => <Switch value={locationServices} onValueChange={toggleLocationServices} color={COLORS.primary} />}
              />
              <List.Item
                title="Política de Privacidade"
                titleStyle={styles.listItemTitle}
                left={props => <List.Icon {...props} icon="shield-account" color={COLORS.primary} />}
                right={props => <IconButton {...props} icon="chevron-right" iconColor={COLORS.textSecondary} />}
                onPress={() => {
                  /* Abrir política de privacidade */
                }}
              />
            </List.Section>
          </Surface>

          {/* Seção de Suporte */}
          <Surface style={styles.settingsCard}>
            <List.Section>
              <List.Subheader style={styles.sectionHeader}>Suporte</List.Subheader>
              <List.Item
                title="Ajuda e Feedback"
                titleStyle={styles.listItemTitle}
                left={props => <List.Icon {...props} icon="help-circle" color={COLORS.primary} />}
                right={props => <IconButton {...props} icon="chevron-right" iconColor={COLORS.textSecondary} />}
                onPress={() => {
                  /* Navegação para tela de ajuda */
                }}
              />
              <List.Item
                title="Sobre o App"
                titleStyle={styles.listItemTitle}
                description="Versão 1.0.0"
                descriptionStyle={styles.listItemDescription}
                left={props => <List.Icon {...props} icon="information" color={COLORS.primary} />}
                right={props => <IconButton {...props} icon="chevron-right" iconColor={COLORS.textSecondary} />}
                onPress={() => {
                  /* Exibir informações do app */
                }}
              />
            </List.Section>
          </Surface>


        <LogoutView />
        
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default Settings;
