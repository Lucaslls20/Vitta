import { StyleSheet } from "react-native";
import { COLORS } from "../Colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",      // centra verticalmente
    justifyContent: "center",  // centraliza tudo horizontalmente
    paddingVertical: 12,
    backgroundColor: COLORS.primary, 
    position: "relative", 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation:4,
    padding: 20,     // necessário para posicionamento absoluto interno
  },
  backButton: {
    position: "absolute",
    left: 16,               
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
    shadowColor: COLORS.shadowApp,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginRight:8
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textOnPrimary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 12,
    color: COLORS.gray,
    opacity: 0.8,
  },
  card: {
    margin: 16,
    elevation: 2,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  featureText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginLeft: 10,
  },
  apiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  apiDetails: {
    flex: 1,
    marginLeft: 12,
  },
  apiName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  apiDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  button: {
    width: '40%',
    borderRadius: 8,
  },
  footerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 20,
  },
  copyright: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  privacyLink: {
    fontSize: 12,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});