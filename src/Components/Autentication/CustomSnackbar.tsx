import React from 'react';
import { Snackbar, Text } from 'react-native-paper';
import {COLORS} from '../../View/Colors'

interface CustomSnackbarProps {
    visible: boolean;
    onDismiss: () => void;
    message: string;
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    visible,
    onDismiss,
    message,
}) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={3000}
            action={{
                label: "Fechar",
                onPress: onDismiss,
            }}
            style={{ backgroundColor: COLORS.error }}
        >
            <Text style={{ color: '#333' }}>{message}</Text>
        </Snackbar>
    );
};