import React from 'react';
import { View } from 'react-native';
import { Button, Portal, Dialog, Paragraph } from 'react-native-paper';
import { useLogoutViewModel } from '../../ViewModels/LogoutViewModel';
import { COLORS } from '../../View/Colors';
import { styles } from '../../View/Settings/styles';

export const LogoutView = () => {
  const {
    isDialogVisible,
    showDialog,
    hideDialog,
    handleLogout
  } = useLogoutViewModel();

  return (
    <>
      <View style={styles.logoutContainer}>
                  <Button
                    mode="contained"
                    icon="logout"
                    onPress={showDialog}
                    style={styles.logoutButton}
                    labelStyle={styles.logoutButtonLabel}
                    contentStyle={{ backgroundColor: COLORS.error }}
                  >
                    Sair da conta
                  </Button>
                </View>

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog} style={styles.logoutDialog}>
          <Dialog.Title style={styles.dialogTitle}>Atenção</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogContent}>Deseja realmente sair do aplicativo?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} theme={{colors: {primary: COLORS.primary}}}>Cancelar</Button>
            <Button 
              onPress={handleLogout}
              theme={{ colors: { primary: COLORS.error } }}>
              Sair
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};