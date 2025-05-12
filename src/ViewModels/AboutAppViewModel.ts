// src/viewmodels/AboutViewModel.ts
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppInfo, ContactInfo, AppInfoRepository } from '../Models/AboutAppModel';

// Chaves para armazenamento local
const APP_INFO_STORAGE_KEY = '@Vitta:appInfo';
const CONTACT_INFO_STORAGE_KEY = '@Vitta:contactInfo';

export const useAboutViewModel = () => {
  // Estados
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Instância do repositório
  const repository = new AppInfoRepository();
  
  // Função para carregar dados do armazenamento local
  const loadFromLocalStorage = async () => {
    try {
      const storedAppInfo = await AsyncStorage.getItem(APP_INFO_STORAGE_KEY);
      const storedContactInfo = await AsyncStorage.getItem(CONTACT_INFO_STORAGE_KEY);
      
      if (storedAppInfo) setAppInfo(JSON.parse(storedAppInfo));
      if (storedContactInfo) setContactInfo(JSON.parse(storedContactInfo));
    } catch (err) {
      console.error('Erro ao carregar dados do armazenamento local:', err);
    }
  };
  
  // Função para salvar dados no armazenamento local
  const saveToLocalStorage = async (appInfoData: AppInfo, contactInfoData: ContactInfo) => {
    try {
      await AsyncStorage.setItem(APP_INFO_STORAGE_KEY, JSON.stringify(appInfoData));
      await AsyncStorage.setItem(CONTACT_INFO_STORAGE_KEY, JSON.stringify(contactInfoData));
    } catch (err) {
      console.error('Erro ao salvar dados no armazenamento local:', err);
    }
  };
  
  // Função principal para carregar dados
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Carrega do armazenamento local primeiro
      await loadFromLocalStorage();
      
      // Busca dados mais recentes do repositório
      const fetchedAppInfo = await repository.getAppInfo();
      const fetchedContactInfo = await repository.getContactInfo();

      if (fetchedAppInfo) {
        setAppInfo(fetchedAppInfo);

        if (fetchedContactInfo) {
          setContactInfo(fetchedContactInfo);
          saveToLocalStorage(fetchedAppInfo, fetchedContactInfo);
        } else {
          const defaultContact = repository.getDefaultContactInfo();
          setContactInfo(defaultContact);
          saveToLocalStorage(fetchedAppInfo, defaultContact);
        }
      } else if (!appInfo) {
        // Caso não tenha dados remotos e nem locais
        const defaultApp = repository.getDefaultAppInfo();
        const defaultContact = repository.getDefaultContactInfo();
        setAppInfo(defaultApp);
        setContactInfo(defaultContact);
        saveToLocalStorage(defaultApp, defaultContact);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Não foi possível carregar as informações do aplicativo. Por favor, tente novamente mais tarde.');
      
      if (!appInfo) {
        setAppInfo(repository.getDefaultAppInfo());
        setContactInfo(repository.getDefaultContactInfo());
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handlers
  const handleOpenLink = (url: string) => url;
  const handleSendEmail = () => contactInfo?.email || 'contato@vittaapp.com';
  const handleOpenStore = () => {
    if (Platform.OS === 'ios') {
      return `itms-apps://itunes.apple.com/app/id${contactInfo?.appStoreId || 'id1234567890'}`;
    } else {
      return `market://details?id=${contactInfo?.playStoreId || 'com.vitta.nutrition'}`;
    }
  };
  
  // Efeito para carregar dados ao montar o componente
  useEffect(() => {
    loadData();
  }, []);
  
  // Função para forçar recarga dos dados
  const refreshData = () => {
    loadData();
  };
  
  return {
    appInfo,
    contactInfo,
    isLoading,
    error,
    handleOpenLink,
    handleSendEmail,
    handleOpenStore,
    refreshData,
  };
};
