import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';
import CancelButton from '../../Components/EditProfile/CancelButton';
import ProfilePictureUpload from '../../Components/EditProfile/ProfilePictureUpload';
import FormInput from '../../Components/EditProfile/FormInput';
import SaveButton from '../../Components/EditProfile/SaveButton';
import { styles } from './styles';
import { useEditProfileViewModel } from '../../ViewModels/useEditProfileViewModel';

const EditProfile: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
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
    pickProfileImage, // <-- já existente
  } = useEditProfileViewModel();

  // Carrega os dados existentes ao montar o componente
  useEffect(() => {
    loadProfile();
  }, []);

  // Imagem padrão que será usada para todos os usuários, se não houver profileImageUri
  const defaultImage = {
    uri: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2124-61f7-bd61-94477d3bb2a6/raw?se=2025-05-23T23%3A16%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=86969acb-b081-504f-86db-ef41501b4cb1&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-23T10%3A04%3A33Z&ske=2025-05-24T10%3A04%3A33Z&sks=b&skv=2024-08-04&sig=wgRnMY%2B6B9cJkS6KXajBdP/l/p%2Bq0zAUaE4HaM3Kqe8%3D',
  };

  return (
    <SafeAreaView style={styles.container}>
      <CancelButton onPress={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <ProfilePictureUpload
          imageSource={profileImageUri ? { uri: profileImageUri } : defaultImage}
          onPressCamera={pickProfileImage}
        />

        <FormInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeHolder="Melissa Peters"
        />

        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeHolder="majesters@gmail.com"
        />

        <FormInput
          label="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeHolder="55 (31) 99904-9860"
        />

        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeHolder="123456"
        />

        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeHolder="123456"
        />

        <View style={styles.saveContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <SaveButton onPress={saveProfile} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
