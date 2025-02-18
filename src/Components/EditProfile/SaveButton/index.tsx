import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/EditProfile/styles';
interface SaveButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, style }) => (
  <Button
    mode="contained"
    onPress={onPress}
    style={[styles.saveButton, style]}
    buttonColor={COLORS.primary}
    textColor={COLORS.white}
  >
    Save
  </Button>
);

export default SaveButton;