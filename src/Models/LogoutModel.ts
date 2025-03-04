import { auth } from '../Services/firebaseConfig';

export const LogoutModel = {
  async performLogout(): Promise<void> {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }
};