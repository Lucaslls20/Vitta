import React from 'react';
import { Card } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const DetailsCard = ({ children }: { children: React.ReactNode }) => (
  <Card style={styles.card}>
    <Card.Content>{children}</Card.Content>
  </Card>
);