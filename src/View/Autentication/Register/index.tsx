import React, { useState } from "react";
import { View, Text, Image, Animated, Easing, ScrollView } from "react-native";
import { TextInput, Button, Title, Subheading, ActivityIndicator, Snackbar } from "react-native-paper";
import { styles } from "./styles";
import { COLORS } from "../../Colors";
import { useRegisterViewModel } from "../../../ViewModels/RegisterViewModel";

export default function Register({ navigation }: any) {
    const [fadeAnim] = useState(new Animated.Value(1));
    const [scaleValue] = useState(new Animated.Value(1));
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading, error, register
    } = useRegisterViewModel();

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
                    <TextInput
                        mode="outlined"
                        label="Digite seu nome"
                        left={<TextInput.Icon icon="account" color={COLORS.primary} />}
                        style={styles.input}
                        theme={{ colors: { primary: COLORS.primary } }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        left={<TextInput.Icon icon="email" color={COLORS.primary} />}
                        style={styles.input}
                        keyboardType="email-address"
                        theme={{ colors: { primary: COLORS.primary } }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                        left={<TextInput.Icon icon="lock" color={COLORS.primary} />}
                        style={styles.input}
                        secureTextEntry
                        theme={{ colors: { primary: COLORS.primary } }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Confirme sua senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        left={<TextInput.Icon icon="lock" color={COLORS.primary} />}
                        style={styles.input}
                        secureTextEntry
                        theme={{ colors: { primary: COLORS.primary } }}
                    />
                    {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
                    <Button
                        mode="contained"
                        onPress={handleRegister}
                        style={[styles.button, loading && styles.buttonDisabled]}
                        contentStyle={styles.buttonContent}
                        disabled={loading}
                        onPressIn={animateButton}
                        labelStyle={styles.buttonLabel}>

                        {loading ? (
                            <ActivityIndicator animating={true} color={COLORS.white} />
                        ) : (
                            "CRIAR CONTA"
                        )}
                    </Button>
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
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                    action={{
                        label: "Fechar",
                        onPress: () => setSnackbarVisible(false),
                    }}
                    style={{ backgroundColor: COLORS.error }}
                >
                 <Text style={{color:'#333'}}>{snackbarMessage}</Text>
                </Snackbar>
            </Animated.View>
        </ScrollView>
    );
}