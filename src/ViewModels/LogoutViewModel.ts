import { useState } from 'react';
import { LogoutModel } from '../Models/LogoutModel';

export const useLogoutViewModel = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  const handleLogout = async () => {
    try {
      await LogoutModel.performLogout();
      hideDialog();
      // Redirecionar ou atualizar estado global de autenticação aqui
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  };

  return {
    isDialogVisible,
    showDialog,
    hideDialog,
    handleLogout
  };
};