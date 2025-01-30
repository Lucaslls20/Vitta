import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Animated, Text } from "react-native";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { styles } from "./styles";
import { COLORS } from "../../Colors";
import { useSplashScreenViewModel } from "../../../ViewModels/SplashScreenViewModel";

export default function SplashScreen({ navigation }: any) {
    const fadeAnim = new Animated.Value(0);
    const [isReady, setIsReady] = useState(false); // Estado para verificar se pode navegar

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
            setIsReady(true); // Define que a animação terminou
        });
    }, []);

    useSplashScreenViewModel(() => {
        if (isReady) {
            navigation.replace("Login"); // Ou "Tabs" se o usuário estiver autenticado
        }
    });

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.content}>
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfcO17XePJif2nP1vqYnvm9FlExVd0D06BA&s",
                    }}
                    style={styles.image}
                />
                <Text style={styles.title}>Bem-vindo ao Vitta</Text>
                <Text style={styles.subtitle}>Melhore sua saúde aqui!</Text>
                <RNActivityIndicator size="large" color={COLORS.primary} style={styles.customIndicator} />
            </View>
        </Animated.View>
    );
}
