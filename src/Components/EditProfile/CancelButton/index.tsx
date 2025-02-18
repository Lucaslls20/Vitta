import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../../View/EditProfile/styles';

interface CancelButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.cancelButton, style]}>
    <Text style={styles.cancelText}>Cancel</Text>
  </TouchableOpacity>
);

export default CancelButton;