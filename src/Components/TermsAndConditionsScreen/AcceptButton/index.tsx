import React from 'react';
import { Button } from 'react-native-paper';
import { styles } from '../../../View/TermsAndConditionsScreen/styles';

interface AcceptButtonProps {
  onPress: () => void;
  disabled: boolean;
  accepted: boolean;
}

export const AcceptButton = ({ onPress, disabled, accepted }: AcceptButtonProps) => (
  <Button
    mode="contained"
    onPress={onPress}
    style={[styles.acceptButton, disabled && styles.disabledButton]}
    labelStyle={styles.acceptButtonLabel}
    disabled={disabled}
  >
    {accepted ? 'You have already agreed' : 'Accept & Continue'}
  </Button>
);