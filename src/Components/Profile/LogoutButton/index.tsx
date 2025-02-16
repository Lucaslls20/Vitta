import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/Profile/styles';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <View style={styles.logoutContainer}>
      <Button
        mode="contained"
        buttonColor="#FF5252"
        style={styles.logoutButton}
        onPress={onLogout}
      >
        Log Out
      </Button>
    </View>
  );
};

export default LogoutButton;
