import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { COLORS } from '../Colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../App';

const EditProfile: React.FC = () => {
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation<NavigationProps>()

    const handleSalvar = () => {
        // Lógica para salvar as alterações
    };

    const handleCancelar = () => {
        navigation.goBack()
    };

    const handleTrocarFotoPerfil = () => {
        // Lógica para abrir câmera ou galeria
    };

    return (
        <View style={styles.container}>
            {/* Botão "Cancelar" no topo */}
            <TouchableOpacity onPress={handleCancelar} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            {/* Área do avatar com botão de câmera sobreposto */}
            <View style={styles.profilePictureContainer}>
                <View style={styles.profileFrame}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKO1YN9MsmIUgHG6HgKjcHBNbTRun4L047w&s' }}
                        style={styles.profilePicture}
                    />
                    <IconButton
                        icon="camera"
                        iconColor={COLORS.white}
                        size={20}
                        onPress={handleTrocarFotoPerfil}
                        style={styles.cameraButton}
                        containerColor={COLORS.primary}
                    />
                </View>
            </View>

            {/* Campos de texto */}
            <TextInput
                label="Name"
                value={nome}
                onChangeText={setNome}
                left={<TextInput.Icon icon="account" color={COLORS.textSecondary} />}
                mode="outlined"
                style={styles.input}
                outlineColor={COLORS.primary}
                activeOutlineColor={COLORS.primary}
                textColor={COLORS.textPrimary}
                theme={{
                    colors: {
                        background: COLORS.secondary,
                    }
                }}
            />

            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                left={<TextInput.Icon icon="account-circle" color={COLORS.textSecondary} />}
                mode="outlined"
                style={styles.input}
                outlineColor={COLORS.primary}
                activeOutlineColor={COLORS.primary}
                textColor={COLORS.textPrimary}
            />

            <TextInput
                label="Phone number"
                value={telefone}
                onChangeText={setTelefone}
                left={<TextInput.Icon icon="phone" color={COLORS.textSecondary} />}
                mode="outlined"
                style={styles.input}
                outlineColor={COLORS.primary}
                activeOutlineColor={COLORS.primary}
                textColor={COLORS.textPrimary}
                keyboardType="phone-pad"
            />

            <TextInput
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                left={<TextInput.Icon icon="email" color={COLORS.textSecondary} />}
                mode="outlined"
                style={styles.input}
                outlineColor={COLORS.primary}
                activeOutlineColor={COLORS.primary}
                textColor={COLORS.textPrimary}
                keyboardType="email-address"
            />

            {/* Botão "Salvar" */}
            <Button
                mode="contained"
                onPress={handleSalvar}
                style={styles.saveButton}
                buttonColor={COLORS.primary}
                textColor={COLORS.white}
            >
                Save
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 40, // para afastar do topo
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    profileFrame: {
        borderRadius: 100,
        borderWidth: 3,
        borderColor: COLORS.accent,
        padding: 4,
        shadowColor: COLORS.textPrimary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    cancelButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    cancelText: {
        color: '#D32F2F',
        fontSize: 16,
    },
    profilePictureContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50, // Deixa a imagem circular
        backgroundColor: COLORS.secondary, // Caso a imagem não carregue
    },

    input: {
        marginBottom: 16,
        backgroundColor: COLORS.secondary,
        borderRadius: 8,
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 4,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
    },
});

export default EditProfile;
