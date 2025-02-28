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
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s' }}
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