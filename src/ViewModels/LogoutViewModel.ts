// ViewModel
import { useState } from 'react';
import { LogoutModel } from '../Models/LogoutModel';
import { useNavigation } from '@react-navigation/native'; // Adicione esta linha
import { NavigationProps } from '../App'; // Adicione esta linha

export const useLogoutViewModel = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>(); // Adicione esta linha

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  const handleLogout = async () => {
    try {
      await LogoutModel.performLogout();
      hideDialog();
      navigation.navigate('Login'); // Adicione navegação para a tela de Login
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