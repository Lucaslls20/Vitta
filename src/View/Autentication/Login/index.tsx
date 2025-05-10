import React, { useState } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import { TextInput, Button, Title, ActivityIndicator, Snackbar } from "react-native-paper";
import { styles } from "./styles";
import { COLORS } from "../../Colors";
import { useLoginViewModel } from "../../../ViewModels/LoginViewModel";
import { auth } from "../../../Services/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { CustomButton } from "../../../Components/Autentication/CustomButton";
import { CustomSnackbar } from "../../../Components/Autentication/CustomSnackbar";
import { CustomTextInput } from "../../../Components/Autentication/CustomTextInput";

export default function Login({ navigation }: any) {
    const [fadeAnim] = useState(new Animated.Value(1));
    const [scaleValue] = useState(new Animated.Value(1));
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const { email, setEmail, password, setPassword, loading, error, login } = useLoginViewModel();

    const handleForgotPassword = async () => {
        if (!email) {
            setSnackbarMessage("Enter your email before resetting your password.");
            setSnackbarVisible(true);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSnackbarMessage("Password reset email sent! Check your inbox.");
        } catch (error) {
            setSnackbarMessage("Error sending email. Check that the email is correct.");
        }
        setSnackbarVisible(true);
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handleLogin = async () => {
        await login();
        if (error) {
            setSnackbarMessage(error);
            setSnackbarVisible(true);
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfcO17XePJif2nP1vqYnvm9FlExVd0D06BA&s",
                    }}
                    style={styles.image}
                />
            </View>

            <View style={styles.form}>
                <Title style={styles.title}>Welcome back!</Title>

                <CustomTextInput
                    label="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    icon="email"
                    keyboardType="email-address"
                    style={styles.input}
                    placeHolder=""
                />

                <CustomTextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    icon="lock"
                    secureTextEntry
                    style={styles.input}
                    placeHolder=""
                />

                <Text style={styles.forgotPassword}>
                Forgot your password?{' '}
                    <Text
                        onPress={handleForgotPassword}
                        style={styles.forgotPasswordClick}>
                        Click here
                    </Text>
                </Text>

                {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

                <CustomButton
                    onPress={handleLogin}
                    onPressIn={animateButton}
                    label="LOGIN"
                    loading={loading}
                    disabled={loading}
                />
                <Text style={styles.footerText}>
                Don't have an account?{' '}
                    <Text
                        style={styles.loginLink}
                        onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>
                </Text>
                <Text style={styles.footerText}>
          By signing in, you agree to our{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
          >
            Privacy Policy
          </Text>.
        </Text>
            </View>
            <CustomSnackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                message={snackbarMessage}
            />
        </Animated.View>
    );
}
