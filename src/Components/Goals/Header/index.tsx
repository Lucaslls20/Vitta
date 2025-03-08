import React from 'react';
import { Appbar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../App';
import { styles } from '../../../View/Goals/styles';

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  
  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Goals" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <Divider style={[styles.headerDivider, { width: '90%', marginHorizontal: 10 }]} />
    </>
  );
};

export default Header;