import { auth } from '../Services/firebaseConfig';

export const LogoutModel = {
  async performLogout(): Promise<void> {
    try {
      await auth.signOut();
      console.log('Logout realizado com sucesso!'); // Adicione este log
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }
};