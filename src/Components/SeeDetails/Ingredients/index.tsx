import React from 'react';
import { Title, Paragraph } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const Ingredients = ({ ingredients }: { ingredients?: string[] }) => (
  <>
    <Title style={styles.sectionTitle}>Ingredients</Title>
    {ingredients?.map((ingredient, index) => (
      <Paragraph key={index} style={styles.listItem}>
        • {ingredient}
      </Paragraph>
    ))}
  </>
);