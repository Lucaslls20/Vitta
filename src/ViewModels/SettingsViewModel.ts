import { useEffect, useState } from 'react';
import { auth, db } from '../Services/firebaseConfig';
import { UserModel } from '../Models/ProfileHeaderModel';
import { doc, getDoc } from 'firebase/firestore';

const useSettingsViewModel = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        (async () => {
          try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            
            let nameFromDB: string | undefined;
            let emailFromDB: string | undefined;
            
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              nameFromDB = data.name;
              emailFromDB = data.email; // Pega o e-mail do Firestore
            }
            
            const name = nameFromDB ||
              firebaseUser.displayName ||
              (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Usuário');

            // Usa o e-mail do Firestore se existir, caso contrário usa o do auth
            const email = emailFromDB || firebaseUser.email;

            setUser({
              uid: firebaseUser.uid,
              displayName: name,
              email: email,
            });
          } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            const fallbackName =
              firebaseUser.displayName ||
              (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Usuário');
              
            // Em caso de erro, mantém o e-mail do auth
            setUser({
              uid: firebaseUser.uid,
              displayName: fallbackName,
              email: firebaseUser.email,
            });
          } finally {
            setLoading(false);
          }
        })();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useSettingsViewModel;