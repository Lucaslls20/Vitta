import { useEffect, useState } from 'react';
import { auth, db } from '../Services/firebaseConfig';
import { UserModel } from '../Models/ProfileHeaderModel';
import { doc, getDoc } from 'firebase/firestore';

const useProfileViewModel = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        (async () => {
          try {
            // Referência ao documento do usuário na coleção "users"
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            
            let nameFromDB: string | undefined;
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              nameFromDB = data.name; // Assume que o campo se chama "name"
            }
            
            // Fallback: displayName do firebase ou parte do email ou 'Usuário'
            const name =
              nameFromDB ||
              firebaseUser.displayName ||
              (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Usuário');

            setUser({
              uid: firebaseUser.uid,
              displayName: name,
              email: firebaseUser.email,
            });
          } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            // Em caso de erro, utiliza o fallback
            const fallbackName =
              firebaseUser.displayName ||
              (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Usuário');
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

export default useProfileViewModel;
