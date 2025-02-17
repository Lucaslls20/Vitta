import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 125, 50, 0.4)'
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 4,
    borderColor: COLORS.white,
    borderRadius: 60,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  name: {
    color: COLORS.white,
    fontWeight: '700',
    marginTop: 16,
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    paddingVertical: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 20,
  },
  statLabel: {
    color: COLORS.textSecondary,
    marginTop: 4,
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: '50%',
    backgroundColor: '#E0E0E0',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32, // Espaçamento aumentado
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 30,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonContent: {
    height: 44, // Altura fixa para consistência
    justifyContent: 'center',
  },
  listSubheader: {
    color: COLORS.primary, // Cor primary
    fontWeight: '700',
    marginTop: 24,
    marginLeft: 0,
    paddingHorizontal: 24,
    fontSize: 15,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  listItem: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: COLORS.secondary,
    marginHorizontal: 15

  },
  logoutContainer: {
    paddingHorizontal: 24,
    marginVertical: 32, // Espaçamento aumentado
  },
  logoutButton: {
    borderRadius: 12,
    backgroundColor: '#D32F2F', // Vermelho mais profissional
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  iconRight: {
    marginLeft: 12
  }
});