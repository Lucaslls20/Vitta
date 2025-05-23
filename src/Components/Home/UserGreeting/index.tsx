import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native'; // Importamos Image de 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../../Services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Home/styles';
import { DailySummary } from '../../../Models/HomeModelNutricion';

interface UserGreetingProps {
    dailySummary: DailySummary | null;
}

export const UserGreeting: React.FC<UserGreetingProps> = ({ dailySummary }) => {
    const [userName, setUserName] = useState<string | null>(null);
    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setUserName(userSnap.data().name || 'Usuário');
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar nome do usuário:', error);
            }
        };

        fetchUserName();
    }, []);

    return (
        <View style={styles.header}>
            <Image
                source={{ uri: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D' }}
                style={[styles.userAvatar, { width: 50, height: 50, borderRadius:25 }]} // Adicionamos width e height ao estilo
            />
            <View>
                <Text style={styles.greeting}>Welcome, {userName || 'Carregando...'}! 👋</Text>
                <View style={styles.caloriesContainer}>
                    <Icon name="fire" size={16} color={COLORS.primary} />
                    <Text style={styles.subGreeting}>
                        Consumption today: {dailySummary?.calories ?? 0} kcal
                    </Text>
                </View>
            </View>
        </View>
    );
};