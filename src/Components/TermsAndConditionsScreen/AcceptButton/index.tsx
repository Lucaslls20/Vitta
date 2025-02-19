import React from 'react';
import { Button } from 'react-native-paper';
import { styles } from '../../../View/TermsAndConditionsScreen/styles';

interface AcceptButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export const AcceptButton = ({ onPress, disabled }: AcceptButtonProps) => (
  <Button
    mode="contained"
    onPress={onPress}
    style={[styles.acceptButton, !disabled && styles.disabledButton]}
    labelStyle={styles.acceptButtonLabel}
    disabled={!disabled}
  >
    Accept & Continue
  </Button>
);