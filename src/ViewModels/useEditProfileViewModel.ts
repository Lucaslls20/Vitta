import { useState, useEffect } from 'react';
import { auth, db, storage } from '../Services/firebaseConfig';
import { updateEmail, updatePassword, User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

  // Function to load existing user data
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
      // Update email if changed
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      // Update password if provided
      if (password) {
        await updatePassword(user, password);
      }

      // Update profile picture if changed
      let photoURL = profileImageUri;
      if (profileImageUri.startsWith('file')) {
        const storageRef = ref(storage, `profilePictures/${uid}`);
        const img = await fetch(profileImageUri).then(res => res.blob());
        await uploadBytes(storageRef, img);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update firestore document
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
  };
};
