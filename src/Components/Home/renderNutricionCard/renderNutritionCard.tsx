import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../../View/PagesBottomTabs/Home/styles';
import { COLORS } from '../../../View/Colors';
import { Text, Chip } from 'react-native-paper';
import { NutritionData } from '../../../Models/HomeModelNutricion';

interface NutritionCardProps {
  nutrition: NutritionData; // Certifique-se de importar a interface NutritionData
}

export default function RenderNutritionCard({ nutrition }: NutritionCardProps){

  const NutritionItem = ({ icon, label, value }: { icon: string; label: string; value?: number | string }) => (
    <View style={styles.nutritionItem}>
      <Icon name={icon} size={20} color={COLORS.white} />
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value !== undefined ? `${value}` : '-'}g</Text>
    </View>
  );
  
  const InfoRow = ({ label, value }: { label: string; value?: number | string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value !== undefined ? `${value}` : '-'}g</Text>
    </View>
  );
  

      return (
        <LinearGradient
      colors={[COLORS.primary, '#3C8C40']}
      style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="food-apple" size={24} color={COLORS.white} />
        <Text style={styles.cardTitle}>Nutritional Information
        </Text>
      </View>

      <View style={styles.nutritionGrid}>
        <NutritionItem icon="fire" label="Calories" value={`${nutrition?.calories} kcal`} />
        <NutritionItem icon="dumbbell" label="Protein" value={`${nutrition?.protein}g`} />
        <NutritionItem icon="water" label="Fat" value={`${nutrition?.fat}g`} />
        <NutritionItem icon="grain" label="Carbohydrates" value={`${nutrition?.carbs}g`} />
      </View>

      {nutrition?.servingWeightGrams && (
        <Chip style={styles.servingChip} textStyle={styles.servingText}>
          Portion: {nutrition.servingWeightGrams}g
        </Chip>
      )}

      <View style={styles.additionalInfo}>
        <InfoRow label="Sugars" value={`${nutrition?.sugars}g`} />
        <InfoRow label="Fibers" value={`${nutrition?.fiber}g`} />
        <InfoRow label="Cholesterol" value={`${nutrition?.cholesterol}mg`} />
        <InfoRow label="Sodium" value={`${nutrition?.sodium}mg`} />
      </View>
    </LinearGradient>
      )
}