import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';
import CancelButton from '../../Components/EditProfile/CancelButton';
import ProfilePictureUpload from '../../Components/EditProfile/ProfilePictureUpload';
import FormInput from '../../Components/EditProfile/FormInput';
import SaveButton from '../../Components/EditProfile/SaveButton';
import { styles } from './styles';

const EditProfile: React.FC = () => {
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation<NavigationProps>()

    const profileImage = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s' };

    return (
        <View style={styles.container}>
            <CancelButton onPress={() => navigation.goBack()} />
            
            <ProfilePictureUpload
                imageSource={profileImage}
                onPressCamera={() => {/* Lógica para trocar foto */}}
            />

            <FormInput
                label="Name"
                icon="account"
                value={nome}
                onChangeText={setNome}
            />

            <FormInput
                label="Username"
                icon="account-circle"
                value={username}
                onChangeText={setUsername}
            />

            <FormInput
                label="Phone number"
                icon="phone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />

            <FormInput
                label="E-mail"
                icon="email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <SaveButton onPress={() => {/* Lógica para salvar */}} />
        </View>
    );
};

export default EditProfile;