import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../../../View/TermsAndConditionsScreen/styles';

interface ClauseCardProps {
  title: string;
  text: string;
}

export const ClauseCard = ({ title, text }: ClauseCardProps) => (
  <Card style={styles.clauseCard}>
    <Card.Content>
      <Title style={styles.clauseTitle}>{title}</Title>
      <Paragraph style={styles.clauseText}>{text}</Paragraph>
    </Card.Content>
  </Card>
);