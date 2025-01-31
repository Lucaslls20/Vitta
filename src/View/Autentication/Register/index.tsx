import React, { useState } from "react";
import { View, Text, Image, Animated, Easing, ScrollView } from "react-native";
import { TextInput, Button, Title, Subheading, ActivityIndicator, Snackbar } from "react-native-paper";
import { styles } from "./styles";
import { useRegisterViewModel } from "../../../ViewModels/RegisterViewModel";
import { CustomButton } from "../../../Components/CustomButton";
import { CustomSnackbar } from "../../../Components/CustomSnackbar";
import { CustomTextInput } from "../../../Components/CustomTextInput";

export default function Register({ navigation }: any) {
    const [fadeAnim] = useState(new Animated.Value(1));
    const [scaleValue] = useState(new Animated.Value(1));
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, loading, error, register, name, setName } = useRegisterViewModel();

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

    const handleRegister = async () => {
        await register();
        if (error) {
            setSnackbarMessage(error);
            setSnackbarVisible(true);
        }
    };

    const handleNavigateToLogin = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate("Login");
            fadeAnim.setValue(1);
        });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                    <Title style={styles.title}>Bem-vindo ao Vitta</Title>
                    <Subheading style={styles.subtitle}>
                        Crie sua conta e melhore sua saúde com a gente!
                    </Subheading>
                    <CustomTextInput
                        label="Digite seu nome"
                        value={name} // Se precisar armazenar, crie um estado para nome
                        onChangeText={setName}
                        icon="account"
                        style={styles.input}
                    />

                    <CustomTextInput
                        label="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        icon="email"
                        keyboardType="email-address"
                        style={styles.input}
                    />

                    <CustomTextInput
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                        icon="lock"
                        secureTextEntry
                        style={styles.input}
                    />

                    <CustomTextInput
                        label="Confirme sua senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        icon="lock"
                        secureTextEntry
                        style={styles.input}
                    />
                    {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
                    <CustomButton
                        onPress={handleRegister}
                        onPressIn={animateButton}
                        label="CRIAR CONTA"
                        loading={loading}
                        disabled={loading}
                    />
                    <Text style={styles.footerText}>
                        Já tem uma conta?{" "}
                        <Text
                            style={styles.loginLink}
                            onPress={handleNavigateToLogin}
                        >
                            Entre agora!
                        </Text>
                    </Text>
                </View>
                <CustomSnackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    message={snackbarMessage}
                />
            </Animated.View>
        </ScrollView>
    );
}