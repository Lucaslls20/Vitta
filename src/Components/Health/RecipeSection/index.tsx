import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/Health/styles';
import { Recipe } from '../../../Models/HealthModel';
import { ListItem } from '../ListItem';

interface RecipeSectionProps {
  title: string;
  data: Recipe[];
}

export const RecipeSection = ({ title, data }: RecipeSectionProps) => (
  <View>
    {data.length > 0 ? (
      <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />
      </>
    ) : (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>
        No recipes found for {title.toLowerCase()}
        </Text>
      </View>
    )}
  </View>
);