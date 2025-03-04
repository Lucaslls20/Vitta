import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../../View/EditProfile/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../../../View/Colors';

interface CancelButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
 <MaterialIcons name='arrow-back-ios-new' size={25} color={COLORS.primary} />
  </TouchableOpacity>
);

export default CancelButton;