import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { ViewStyle } from "react-native";
import { COLORS } from "../../View/Colors";

interface CustomTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    icon?: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    style?: ViewStyle;
    placeHolder: string
}

export function CustomTextInput({
    label,
    value,
    onChangeText,
    icon,
    secureTextEntry = false,
    keyboardType = "default",
    style,
    placeHolder
}: CustomTextInputProps) {
   
    const [isVisible, setIsVisible] = useState(!secureTextEntry);

    return (
        <TextInput
            mode="outlined"
            label={label}
            value={value}
            placeholder={placeHolder}
            onChangeText={onChangeText}
            left={icon && <TextInput.Icon icon={icon} color={COLORS.primary} />}
            right={
                secureTextEntry ? (
                    <TextInput.Icon
                        icon={isVisible ? "eye" : "eye-off"}
                        color={COLORS.primary}
                        onPress={() => setIsVisible(!isVisible)}
                    />
                ) : null
            }
            secureTextEntry={secureTextEntry && !isVisible}
            keyboardType={keyboardType}
            style={style}
            theme={{ colors: { primary: COLORS.primary } }}
        />
    );
}
