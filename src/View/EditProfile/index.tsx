import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';
import CancelButton from '../../Components/EditProfile/CancelButton';
import ProfilePictureUpload from '../../Components/EditProfile/ProfilePictureUpload';
import FormInput from '../../Components/EditProfile/FormInput';
import SaveButton from '../../Components/EditProfile/SaveButton';
import { styles } from './styles';

const EditProfile: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProps>()

    const profileImage = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s' };

    return (
        <SafeAreaView style={styles.container}>
            <CancelButton onPress={() => navigation.goBack()} />
            
            <ProfilePictureUpload
                imageSource={profileImage}
                onPressCamera={() => {/* Lógica para trocar foto */}}
            />

            <FormInput
                label="Name"
                value={name}
                onChangeText={setName}
                placeHolder='Melissa Peters'
            />

            <FormInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeHolder='majesters@gmail.com'
            />

            <FormInput
                label="Phone number"
                value={password}
                onChangeText={setPassword}
                placeHolder='55 (31) 999049860'
            />
            <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeHolder='123456'
            />
            <FormInput
                label="Confirm Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeHolder='123456'
            />


            <SaveButton onPress={() => {/* Lógica para salvar */}} />
        </SafeAreaView>
    );
};

export default EditProfile;
