import React from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Health/styles';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => (
  <TextInput
    placeholder="Search"
    placeholderTextColor={COLORS.shadow}
    style={styles.searchInput}
    theme={{ colors: { primary: COLORS.shadow } }}
    right={<TextInput.Icon icon="magnify" color={COLORS.shadow} />}
    accessibilityLabel="Search field"
    value={searchQuery}
    onChangeText={onSearchChange}
  />
);