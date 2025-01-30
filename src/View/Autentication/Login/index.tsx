import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Animated, Easing } from "react-native";
import { TextInput, Button, Title, ActivityIndicator } from "react-native-paper";
import { styles } from "./styles";
import { COLORS } from "../../Colors";

export default function Login({ navigation }: any) {
    const [loading, setLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [scaleValue] = useState(new Animated.Value(1));

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Tabs');
        }, 2000);
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

    const handleNavigateToRegister = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate("Register");
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
                <Title style={styles.title}>Bem-vindo de volta!</Title>

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

                <Text style={styles.forgotPassword}>
                    Esqueceu sua senha?{' '}
                    <Text 
                        onPress={() => console.log("Alterar senha")} 
                        style={styles.forgotPasswordClick}>
                        Clique aqui
                    </Text>
                </Text>

                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <Button
                        mode="contained"
                        onPressIn={animateButton}
                        onPress={handleLogin}
                        style={[styles.button, loading && styles.buttonDisabled]}
                        contentStyle={styles.buttonContent}
                        disabled={loading}
                        labelStyle={styles.buttonLabel}>
                        {loading ? (
                            <ActivityIndicator animating={true} color={COLORS.white} />
                        ) : (
                            "LOGIN"
                        )}
                    </Button>
                </Animated.View>

                <Text style={styles.footerText}>
                    Não possui uma conta?{' '}
                    <Text
                        style={styles.loginLink}
                        onPress={handleNavigateToRegister}>
                        Faça Cadastro
                    </Text>
                </Text>
            </View>
        </Animated.View>
    );
}