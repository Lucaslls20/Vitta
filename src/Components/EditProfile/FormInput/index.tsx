import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/EditProfile/styles';

interface FormInputProps {
  label: string;
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  style?: StyleProp<ViewStyle>;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  icon, 
  value, 
  onChangeText, 
  keyboardType = 'default', 
  style 
}) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    left={<TextInput.Icon icon={icon} color={COLORS.textSecondary} />}
    mode="outlined"
    style={[styles.input, style]}
    outlineColor={COLORS.primary}
    activeOutlineColor={COLORS.primary}
    textColor={COLORS.textPrimary}
    keyboardType={keyboardType}
    theme={{ colors: { background: COLORS.secondary } }}
  />
);

export default FormInput;