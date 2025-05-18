// ViewModels/useEditProfileViewModel.ts
import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { auth, db } from '../Services/firebaseConfig';          // Web SDK só para Auth/Firestore
import storageNative from '@react-native-firebase/storage';     // nativo
import { updateEmail, updatePassword, User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse
} from 'react-native-image-picker';
import { EditProfileModel } from '../Models/EditProfileModel';

// Valida formato de email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useEditProfileViewModel = (): EditProfileModel => {
  const user = auth.currentUser as User | null;
  const uid = user?.uid;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [profileImageUri, setProfileImageUri] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega dados iniciais
  const loadProfile = async (): Promise<void> => {
    if (!uid) return;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || '');
        setEmail(data.email || '');
        setPhoneNumber(data.phone || '');
        setProfileImageUri(data.photoURL || '');
      }
    } catch (err: any) {
      console.error('Error loading user data', err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [uid]);

  // Trata resposta do picker
  const handlePickerResult = (result: ImagePickerResponse) => {
    if (result.didCancel) return;
    if (result.errorCode) {
      console.error('ImagePicker Error:', result.errorMessage);
      setError('Não foi possível selecionar a imagem.');
      return;
    }
    const asset: Asset | undefined = result.assets?.[0];
    if (asset?.uri) {
      setProfileImageUri(asset.uri);
    }
  };

  // Mostra diálogo câmera x galeria
  const pickProfileImage = async (): Promise<void> => {
    const camOpts: CameraOptions = { mediaType: 'photo', quality: 0.8 };
    const libOpts: ImageLibraryOptions = { mediaType: 'photo', quality: 0.8 };

    Alert.alert(
      'Selecionar imagem',
      'Origem da foto:',
      [
        {
          text: 'Câmera',
          onPress: async () => handlePickerResult(await launchCamera(camOpts)),
        },
        {
          text: 'Galeria',
          onPress: async () => handlePickerResult(await launchImageLibrary(libOpts)),
        },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const saveProfile = async (): Promise<void> => {
    setError(null);
    if (!user || !uid) {
      setError('Usuário não autenticado.');
      return;
    }
    if (password && password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Por favor insira um email válido.');
      return;
    }

    setLoading(true);
    try {
      // Atualiza Auth
      if (email !== user.email) await updateEmail(user, email);
      if (password) await updatePassword(user, password);

      // Se mudou a foto e é URI local → upload via RNFirebase native
      let photoURL = profileImageUri;
      if (profileImageUri.startsWith('file://') || profileImageUri.startsWith('content://')) {
        // Normaliza URI Android
        const uploadUri = Platform.OS === 'android'
          ? profileImageUri.replace('file://', '')
          : profileImageUri;
        
        // Faz upload do arquivo diretamente
        const refPath = `profilePictures/${uid}`;
        const task = await storageNative().ref(refPath).putFile(uploadUri);

        // Se quiser acompanhar progresso:
        // task.on('state_changed', snapshot => {/* ... */});

        photoURL = await storageNative().ref(refPath).getDownloadURL();
      }

      // Grava no Firestore
      await updateDoc(doc(db, 'users', uid), {
        name,
        email,
        phone: phoneNumber,
        ...(photoURL && { photoURL }),
      });
    } catch (err: any) {
      console.error('SaveProfile error:', err);
      setError(err.message || 'Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    profileImageUri,
    loading,
    error,
    loadProfile,
    saveProfile,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmPassword,
    setProfileImageUri,
    pickProfileImage,
  };
};
