import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../../../View/Colors';
import { styles } from '../../../View/PagesBottomTabs/Home/styles';

interface SearchFoodInputProps {
  query: string;
  setQuery: (text: string) => void;
  handleSearch: () => void;
}

export const SearchFoodInput: React.FC<SearchFoodInputProps> = ({
  query,
  setQuery,
  handleSearch
}) => (
  <View style={styles.searchContainer}>
    <TextInput
      mode="outlined"
      label="What did you eat today?"
      value={query}
      onChangeText={setQuery}
      style={styles.searchInput}
      outlineColor={COLORS.primary}
      activeOutlineColor={COLORS.primary}
      right={<TextInput.Icon icon="magnify" color={COLORS.primary} onPress={handleSearch} />}
      onSubmitEditing={handleSearch}
      placeholder="Ex: 1 cup of brown rice"
      placeholderTextColor={COLORS.textSecondary}
    />
  </View>
);