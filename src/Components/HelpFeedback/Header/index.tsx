import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/HelpFeedbackScreen/styles';
import { NavigationProps } from '../../../App';

export interface HeaderProps {
    navigation: NavigationProps; // Replace with the correct type for your navigation prop
    activeTab: 'Help' | 'Feedback';
    setActiveTab: (tab: 'Help' | 'Feedback') => void;
}

const Header = ({ navigation, activeTab, setActiveTab }: HeaderProps) => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Arrow name="arrow-back-ios" size={25} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help and Feedback</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Help' && styles.activeTab]}
          onPress={() => setActiveTab('Help')}>
          <Icon
            name="help-circle"
            size={24}
            color={activeTab === 'Help' ? COLORS.primary : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Help' && styles.activeTabText,
            ]}>
            Help
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Feedback' && styles.activeTab]}
          onPress={() => setActiveTab('Feedback')}>
          <Icon
            name="message-text"
            size={24}
            color={
              activeTab === 'Feedback' ? COLORS.primary : COLORS.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Feedback' && styles.activeTabText,
            ]}>
            Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;