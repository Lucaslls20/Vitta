import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/Profile/styles';

interface ProfileHeaderProps {
  backgroundImage: string;
  avatarImage: string;
  name: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  backgroundImage,
  avatarImage,
  name,
}) => {
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.header}
      blurRadius={3}
    >
      <View style={styles.overlay} />
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{ uri: avatarImage }}
          size={120}
          style={styles.avatar}
        />
        <Text variant="titleLarge" style={styles.name}>
          {name}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ProfileHeader;
