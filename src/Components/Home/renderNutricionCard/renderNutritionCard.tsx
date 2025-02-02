import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../../View/PagesBottomTabs/Home/styles';
import { COLORS } from '../../../View/Colors';
import { Text, Chip } from 'react-native-paper';
import { useHomeViewModel } from '../../../ViewModels/HomeViewModelNutritionix';

export default function RenderNutritionCard(){

    const { nutrition, loading, error, fetchNutritionData, dailySummary, setError } = useHomeViewModel();

    const NutritionItem = ({ icon, label, value }: any) => (
        <View style={styles.nutritionItem}>
          <Icon name={icon} size={20} color={COLORS.white} />
          <Text style={styles.itemLabel}>{label}</Text>
          <Text style={styles.itemValue}>{value}</Text>
        </View>
      );

      const InfoRow = ({ label, value }: any) => (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{label}:</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      );

      return (
        <LinearGradient
      colors={[COLORS.primary, '#3C8C40']}
      style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="food-apple" size={24} color={COLORS.white} />
        <Text style={styles.cardTitle}>Informações Nutricionais</Text>
      </View>

      <View style={styles.nutritionGrid}>
        <NutritionItem icon="fire" label="Calorias" value={`${nutrition?.calories} kcal`} />
        <NutritionItem icon="dumbbell" label="Proteína" value={`${nutrition?.protein}g`} />
        <NutritionItem icon="water" label="Gordura" value={`${nutrition?.fat}g`} />
        <NutritionItem icon="grain" label="Carboidratos" value={`${nutrition?.carbs}g`} />
      </View>

      {nutrition?.servingWeightGrams && (
        <Chip style={styles.servingChip} textStyle={styles.servingText}>
          Porção: {nutrition.servingWeightGrams}g
        </Chip>
      )}

      <View style={styles.additionalInfo}>
        <InfoRow label="Açúcares" value={`${nutrition?.sugars}g`} />
        <InfoRow label="Fibras" value={`${nutrition?.fiber}g`} />
        <InfoRow label="Colesterol" value={`${nutrition?.cholesterol}mg`} />
        <InfoRow label="Sódio" value={`${nutrition?.sodium}mg`} />
      </View>
    </LinearGradient>
      )
}