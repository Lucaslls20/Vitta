import React from 'react';
import {Appbar, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../App';
import {styles} from '../../../View/Goals/styles';
import {COLORS} from '../../../View/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <Appbar.Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <Appbar.Content title="My Goals" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <Divider
        style={[styles.headerDivider, {width: '90%', marginHorizontal: 10}]}
      />
    </>
  );
};

export default Header;
