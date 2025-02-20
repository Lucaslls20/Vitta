import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../../View/TermsAndConditionsScreen/styles';
import { COLORS } from '../../../View/Colors';

interface HeaderProps {
  onGoBack: () => void;
  title: string
}

export const Header = ({ onGoBack, title }: HeaderProps) => (
  <View style={styles.header}>
    <TouchableOpacity
      onPress={onGoBack}
      style={styles.backButton}
      accessible={true}
      accessibilityLabel="Go back"
    >
      <Icon name="arrow-left" size={30} color={COLORS.primary} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>
   {title}
    </Text>
  </View>
);