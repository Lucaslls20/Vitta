import React, {useState} from 'react';
import {View, Text, Image, Animated, Easing, ScrollView} from 'react-native';
import {
  TextInput,
  Button,
  Title,
  Subheading,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import {styles} from './styles';
import {useRegisterViewModel} from '../../../ViewModels/RegisterViewModel';
import {CustomButton} from '../../../Components/Autentication/CustomButton';
import {CustomSnackbar} from '../../../Components/Autentication/CustomSnackbar';
import {CustomTextInput} from '../../../Components/Autentication/CustomTextInput';

export default function Register({navigation}: any) {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleValue] = useState(new Animated.Value(1));
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    register,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
  } = useRegisterViewModel();

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRegister = async () => {
    await register();
    if (error) {
      setSnackbarMessage(error);
      setSnackbarVisible(true);
    }
  };

  const handleNavigateToLogin = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Login');
      fadeAnim.setValue(1);
    });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfcO17XePJif2nP1vqYnvm9FlExVd0D06BA&s',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.form}>
          <Title style={styles.title}>Welcome to Vitta</Title>
          <Subheading style={styles.subtitle}>
            Create your account and improve your health with us!
          </Subheading>
          <CustomTextInput
            label="Enter yout name"
            value={name} // Se precisar armazenar, crie um estado para nome
            onChangeText={setName}
            icon="account"
            style={styles.input}
            placeHolder="Example Peter"
          />

          <CustomTextInput
            label="Enter your e-mail"
            value={email}
            onChangeText={setEmail}
            icon="email"
            keyboardType="email-address"
            style={styles.input}
            placeHolder="user123@gmail.com"
          />

          <CustomTextInput
            label="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            icon="phone"
            keyboardType="phone-pad"
            style={styles.input}
            placeHolder="+55 21 91234-5678"
          />

          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            icon="lock"
            secureTextEntry
            style={styles.input}
            placeHolder="Create your password!"
          />

          <CustomTextInput
            label="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            icon="lock"
            secureTextEntry
            style={styles.input}
            placeHolder=""
          />
          {error && (
            <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
          )}
          <CustomButton
            onPress={handleRegister}
            onPressIn={animateButton}
            label="CREATE ACCOUNT"
            loading={loading}
            disabled={loading}
          />
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={handleNavigateToLogin}>
              Enter now!
            </Text>
          </Text>
          <Text style={styles.footerText}>
            By signing in, you agree to our{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
        <CustomSnackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          message={snackbarMessage}
        />
      </Animated.View>
    </ScrollView>
  );
}
