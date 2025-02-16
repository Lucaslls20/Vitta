import React from 'react';
import { Title, Paragraph } from 'react-native-paper';
import { styles } from '../../../View/PagesBottomTabs/SeeDetails/styles';

export const PreparationSteps = ({ steps }: { steps?: string[] }) => (
  <>
    <Title style={styles.sectionTitle}>Preparation method</Title>
    {steps?.map((step, index) => (
      <Paragraph key={index} style={styles.listItem}>
        {index + 1}. {step}
      </Paragraph>
    ))}
  </>
);