import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const HeaderComponent = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <View style={styles.headerContainer}>
    <LinearGradient
      colors={[COLORS.primary, COLORS.shadow]}
      style={styles.gradientHeader}
    >
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={onBack} color={COLORS.white} />
        <Appbar.Content title={title} titleStyle={styles.headerTitle} />
      </Appbar.Header>
    </LinearGradient>
  </View>
);