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
                   Log out of account
                  </Button>
                </View>

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog} style={styles.logoutDialog}>
          <Dialog.Title style={styles.dialogTitle}>Attention</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogContent}>Are you sure you want to exit the application?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} theme={{colors: {primary: COLORS.primary}}}>Cancel</Button>
            <Button 
              onPress={handleLogout}
              theme={{ colors: { primary: COLORS.error } }}>
             Leave
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};