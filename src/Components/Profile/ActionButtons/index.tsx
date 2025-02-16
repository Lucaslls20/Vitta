import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Profile/styles';

interface ActionButtonsProps {
  onEditProfile: () => void;
  onShare: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEditProfile, onShare }) => {
  return (
    <View style={styles.actionsContainer}>
      <Button
        mode="contained"
        buttonColor={COLORS.primary}
        style={styles.button}
        icon="pencil"
        contentStyle={styles.buttonContent}
        onPress={onEditProfile}
      >
        Edit Profile
      </Button>
      <Button
        mode="outlined"
        textColor={COLORS.primary}
        style={styles.button}
        contentStyle={styles.buttonContent}
        onPress={onShare}
      >
        Share
      </Button>
    </View>
  );
};

export default ActionButtons;
