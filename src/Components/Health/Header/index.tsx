import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../../../Services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { COLORS } from '../../../View/Colors';

export const Header: React.FC = () => {
  const [userName, setUserName] = useState<string>('Carregando...');
  const [userAvatar, setUserAvatar] = useState<string | null>('https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserName(data.name || 'Usuário');
            setUserAvatar(data.avatarUrl || null);
          }
        }
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Appbar.Header style={styles.appBar}>
      <Appbar.Action
        icon="menu"
        onPress={() => {}}
        accessibilityLabel="Open menu"
      />
      <Appbar.Content
        title={userName}
        titleStyle={styles.appBarTitle}
      />
      <TouchableOpacity onPress={() => {}} accessibilityLabel="User profile">
        <Image
         source={{uri:'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D'}}
          style={[styles.userAvatar, { width: 50, height: 50, borderRadius: 25 }]}
        />
      </TouchableOpacity>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: COLORS.secondary,
    elevation: 4,
  },
  appBarTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  userAvatar: {
    backgroundColor: COLORS.primary, // cor de fundo enquanto carrega
  },
});
