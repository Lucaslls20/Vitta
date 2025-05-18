// ViewModels/useEditProfileViewModel.ts
import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { auth, db, storage } from '../Services/firebaseConfig';
import { updateEmail, updatePassword, User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchCamera, launchImageLibrary, Asset, CameraOptions, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { EditProfileModel } from '../Models/EditProfileModel';

// Utility to validate email format
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

  // Carrega dados iniciais do usuário
  const loadProfile = async (): Promise<void> => {
    if (!uid) return;
    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
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

  // Manipula o resultado do picker
  const handlePickerResult = (result: ImagePickerResponse) => {
    if (result.didCancel) return;
    if (result.errorCode) {
      console.error('ImagePicker Error: ', result.errorMessage);
      setError('Não foi possível selecionar a imagem.');
      return;
    }
    const asset: Asset | undefined = result.assets?.[0];
    if (asset?.uri) {
      setProfileImageUri(asset.uri);
    }
  };

  // Abre um Alert para escolher Câmera ou Galeria
  const pickProfileImage =  async (): Promise<void> => {
    const optionsCamera: CameraOptions = { mediaType: 'photo', quality: 0.8 };
    const optionsLibrary: ImageLibraryOptions = { mediaType: 'photo', quality: 0.8 };

    Alert.alert(
      'Selecionar imagem',
      'Escolha a origem da foto',
      [
        {
          text: 'Câmera',
          onPress: async () => {
            const result = await launchCamera(optionsCamera);
            handlePickerResult(result);
          },
        },
        {
          text: 'Galeria',
          onPress: async () => {
            const result = await launchImageLibrary(optionsLibrary);
            handlePickerResult(result);
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const saveProfile = async (): Promise<void> => {
    setError(null);
    if (!user || !uid) {
      setError('User not authenticated.');
      return;
    }
    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      // Atualiza email e senha
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      if (password) {
        await updatePassword(user, password);
      }

      // Se a URI for local (file://), faz upload
      let photoURL = profileImageUri;
      if (profileImageUri.startsWith('file://')) {
        const storageRef = ref(storage, `profilePictures/${uid}`);
        const blob = await fetch(profileImageUri).then(res => res.blob());
        await uploadBytes(storageRef, blob);
        photoURL = await getDownloadURL(storageRef);
      }

      // Atualiza Firestore
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        name,
        email,
        phone: phoneNumber,
        ...(photoURL && { photoURL }),
      });
    } catch (err: any) {
      setError(err.message || 'Error updating profile.');
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
