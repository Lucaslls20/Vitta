import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../Services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { COLORS } from '../../View/Colors';
import { styles } from '../../View/PagesBottomTabs/Home/styles';
import { DailySummary } from '../../Models/HomeModelNutricion';

interface UserGreetingProps {
    dailySummary: DailySummary | null;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ dailySummary }) => {
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
            <Avatar.Icon icon="account" size={56} style={styles.userAvatar} theme={{ colors: { primary: COLORS.primary } }} />
            <View>
                <Text style={styles.greeting}>Welcome, {userName || 'Carregando...'}! 👋</Text>
                <View style={styles.caloriesContainer}>
                    <Icon name="fire" size={16} color={COLORS.primary} />
                    <Text style={styles.subGreeting}>
                        Consumption today: {dailySummary?.dailyCalories?.[currentDate] ?? 0} kcal
                    </Text>

                </View>
            </View>
        </View>
    );
};

export default UserGreeting;