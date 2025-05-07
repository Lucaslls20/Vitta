import { useEffect, useState } from 'react';
import { auth, db } from '../Services/firebaseConfig';
import { UserModel } from '../Models/ProfileHeaderModel';
import { doc, getDoc } from 'firebase/firestore';

const useProfileViewModel = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      (async () => {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let nameFromDB: string | undefined;
          let emailFromDB: string | undefined;

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            // **Ajuste aqui**: use o campo correto do Firestore
            nameFromDB = data.displayName as string;
            emailFromDB = data.email as string;
          }

          const name = nameFromDB
            || firebaseUser.displayName?.toUpperCase()
            || (firebaseUser.email?.split('@')[0])
            || 'Usuário';

          const email = emailFromDB || firebaseUser.email || '';

          setUser({ uid: firebaseUser.uid, displayName: name, email });
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          const fallbackName =
            firebaseUser.displayName
            || (firebaseUser.email?.split('@')[0])
            || 'Usuário';

          setUser({
            uid: firebaseUser.uid,
            displayName: fallbackName,
            email: firebaseUser.email || '',
          });
        } finally {
          setLoading(false);
        }
      })();
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useProfileViewModel;
