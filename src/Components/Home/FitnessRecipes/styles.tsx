import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../View/Colors";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;


export const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    marginRight: 16,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    paddingBottom: 8,
  },
  image: {
    height: 150,
  },
  content: {
    flex: 1, // Ocupa o espaço disponível
    justifyContent: 'center', // Garante que o título fique alinhado ao centro verticalmente
    paddingHorizontal: 8,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    paddingHorizontal: 8,
    paddingBottom: 8, // Dá um espaçamento na parte inferior
    backgroundColor: COLORS.secondary,
  },
  button: {
    borderRadius: 20,
  },
  buttonLabel: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
