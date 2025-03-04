import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/EditProfile/styles';

interface FormInputProps {
  label: string;
  // Removido o 'icon' ou você pode torná-lo opcional se necessário:
  // icon?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  placeHolder: string
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  keyboardType = 'default', 
  style,
  secureTextEntry = false, // valor padrão para inputs que não sejam de senha
  placeHolder,
}) => (
  <View style={[styles.inputContainer, style]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      mode='outlined'
      style={styles.input}
      outlineColor={COLORS.border}
      activeOutlineColor={COLORS.primary}
      textColor={COLORS.textPrimary}
      keyboardType={keyboardType}
      placeholder={placeHolder}
      secureTextEntry={secureTextEntry}
      theme={{ 
        colors: { 
          background: COLORS.white,
          onSurfaceVariant: COLORS.textSecondary
        } 
      }}
    />
  </View>
);

export default FormInput;
