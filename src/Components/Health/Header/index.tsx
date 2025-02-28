import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, TouchableOpacity } from 'react-native';
import { styles } from '../../../View/PagesBottomTabs/Health/styles';

interface HeaderProps {
  userName: string;
  userAvatar: string;
}

export const Header = ({ userName, userAvatar }: HeaderProps) => (
  <Appbar.Header style={styles.appBar}>
    <Appbar.Action
      icon="menu"
      onPress={() => {}}
      accessibilityLabel="Open menu"
    />
    <Appbar.Content
      title={userName}
      titleStyle={styles.appBarTitle}
    />
    <TouchableOpacity onPress={() => {}} accessibilityLabel="User profile">
      <Image
        source={{ uri: userAvatar }}
        style={[styles.userAvatar, { width: 44, height:44 , borderRadius:22 }]}
      />
    </TouchableOpacity>
  </Appbar.Header>
);