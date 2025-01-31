import React from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../View/Colors';
import { styles } from '../View/Autentication/Login/styles';

interface CustomButtonProps {
    onPress: () => void;
    onPressIn?: () => void;
    label: string;
    loading?: boolean;
    disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    onPressIn,
    label,
    loading = false,
    disabled = false,
}) => {
    return (
        <Button
            mode="contained"
            onPress={onPress}
            onPressIn={onPressIn}
            style={[styles.button, disabled && styles.buttonDisabled]}
            contentStyle={styles.buttonContent}
            disabled={disabled}
            labelStyle={styles.buttonLabel}
        >
            {loading ? (
                <ActivityIndicator animating={true} color={COLORS.white} />
            ) : (
                label
            )}
        </Button>
    );
};