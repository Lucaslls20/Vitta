import React from 'react';
import { View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../View/PagesBottomTabs/Graphic/styles';
import { COLORS } from '../../../View/Colors';

const ActionCards: React.FC = () => {
  return (
    <View style={styles.actionCards}>
      <Surface style={[styles.actionCard, { backgroundColor: COLORS.secondary }]}>
        <MaterialIcons name="restaurant" size={28} color={COLORS.primary} />
        <Text style={styles.actionCardText}>Register Meal</Text>
      </Surface>
      <Surface style={[styles.actionCard, { backgroundColor: COLORS.accent }]}>
        <MaterialIcons name="fitness-center" size={28} color={COLORS.textPrimary} />
        <Text style={styles.actionCardText}>Add Exercise</Text>
      </Surface>
    </View>
  );
};

export default ActionCards;
