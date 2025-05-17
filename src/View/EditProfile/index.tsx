import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, ScrollView } from 'react-native';
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
    setProfileImageUri,
  } = useEditProfileViewModel();

  // Load existing data on mount
  useEffect(() => {
    loadProfile();
  }, []);

  // Default placeholder if no image
  const defaultImage = { uri: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg' };

  return (
    <SafeAreaView style={styles.container}>
      <CancelButton onPress={() => navigation.goBack()} />

     <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <ProfilePictureUpload
          imageSource={profileImageUri ? { uri: profileImageUri } : defaultImage}
          onPressCamera={() => {
            // TODO: open image picker and then:
            // setProfileImageUri(pickedUri);
          }}
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
