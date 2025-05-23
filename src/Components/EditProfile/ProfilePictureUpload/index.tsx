import React from 'react';
import { View, Image, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { IconButton } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import {styles} from '../../../View/EditProfile/styles'

interface ProfilePictureUploadProps {
  imageSource: ImageSourcePropType;
  onPressCamera: () => void;
  style?: StyleProp<ViewStyle>;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ imageSource, onPressCamera, style }) => (
  <View style={[styles.profilePictureContainer, style]}>
    <View style={styles.profileFrame}>
      <Image source={imageSource} style={styles.profilePicture} />
     {/* <IconButton
        icon="camera"
        iconColor={COLORS.white}
        size={20}
        onPress={onPressCamera}
        style={styles.cameraButton}
        containerColor={COLORS.primary}
      /> */}
    </View>
  </View>
);

export default ProfilePictureUpload;