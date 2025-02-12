import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
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
    <Avatar.Image
      size={40}
      source={{ uri: userAvatar }}
      style={styles.userAvatar}
      onTouchEnd={() => {}}
      accessibilityLabel="User profile"
    />
  </Appbar.Header>
);