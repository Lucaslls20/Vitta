import { useEffect } from "react";
import { auth } from "../Services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../App";

export const useSplashScreenViewModel = (onFinish: () => void) => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => { // Aguarda a SplashScreen antes de navegar
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Tabs" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
        onFinish(); // Chama o callback ao finalizar
      }, 5000); // Mesmo tempo da SplashScreen
    });

    return () => unsubscribe();
  }, [navigation]);
};
