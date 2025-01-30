import React, { useState } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import { TextInput, Button, Title, Subheading, ActivityIndicator } from "react-native-paper";
import { styles } from "./styles";
import { COLORS } from "../../Colors";

export default function Register({ navigation }: any) {
    const [loading, setLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [scaleValue] = useState(new Animated.Value(1));

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


    const handleRegister = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("Cadastro realizado");
            navigation.navigate('Tabs')
        }, 2000);
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
                    left={<TextInput.Icon icon="email" color={COLORS.primary} />}
                    style={styles.input}
                    keyboardType="email-address"
                    theme={{ colors: { primary: COLORS.primary } }}
                />
                <TextInput
                    mode="outlined"
                    label="Senha"
                    left={<TextInput.Icon icon="lock" color={COLORS.primary} />}
                    style={styles.input}
                    secureTextEntry
                    theme={{ colors: { primary: COLORS.primary } }}
                />
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
        </Animated.View>
    );
}