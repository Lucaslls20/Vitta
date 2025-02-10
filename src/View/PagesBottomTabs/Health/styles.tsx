import { StyleSheet } from "react-native";
import { COLORS } from "../../Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  appBar: {
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  appBarTitle: {
    color: COLORS.textPrimary,
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  search: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  list: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  item: {
    width: 160,
    height: 200,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
  },
  searchInput: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    elevation: 2,
    paddingHorizontal: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    justifyContent: "flex-end",
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  userAvatar: {
    marginRight: 10,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  listContainer: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  card: {
    width: 160,
    height: 200,
    borderRadius: 12,
    marginRight: 16,
    overflow: "hidden",
    backgroundColor: COLORS.secondary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
    position: "absolute",
  },
  imageLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardButton: {
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  cardButtonLabel: {
    color: "#fff",
  },
  noResultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  noResultsText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontStyle: "italic",
  },
});
