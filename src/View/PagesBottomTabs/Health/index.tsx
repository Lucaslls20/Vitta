import React, { useState, useEffect } from "react";
import { RecipesViewModel } from "../../../ViewModels/HealthViewModel";
import { Recipe } from "../../../Models/HealthModel";
import { COLORS } from "../../Colors";
import { SafeAreaView, View, FlatList, ScrollView, ActivityIndicator, Image } from "react-native";
import { Appbar, Text, TextInput, Avatar, Button } from "react-native-paper";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../App";
import LinearGradient from "react-native-linear-gradient";

export default function Health() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewModel] = useState(new RecipesViewModel());
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const checkDataLoaded = () => {
      if (
        viewModel.breakfastRecipes.length > 0 &&
        viewModel.lunchRecipes.length > 0 &&
        viewModel.dinnerRecipes.length > 0
      ) {
        setIsLoading(false);
      } else {
        setTimeout(checkDataLoaded, 500);
      }
    };
    checkDataLoaded();
  }, []);

  // Filtra as receitas conforme o termo de pesquisa (case-insensitive)
  const filteredBreakfast = viewModel.breakfastRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredLunch = viewModel.lunchRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDinner = viewModel.dinnerRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ListItem = ({ item }: { item: Recipe }) => {
    const [imageError, setImageError] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const unsplashFallback =
      "https://blog.consumer.com.br/wp-content/uploads/2020/11/culin%C3%A1ria-regional-brasileira.jpg";
    const imageUrl = imageError ? unsplashFallback : item.image;

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.cardImage}
          onError={() => setImageError(true)}
          onLoadEnd={() => setIsImageLoading(false)}
          accessibilityLabel={`Imagem da receita ${item.title}`}
        />
        {isImageLoading && (
          <ActivityIndicator style={styles.imageLoader} size="small" color={COLORS.primary} />
        )}
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
          style={styles.gradientOverlay}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Button
            mode="contained"
            icon="arrow-right"
            onPress={() => navigation.navigate("SeeDetails", { recipeId: item.id })}
            style={styles.cardButton}
            labelStyle={styles.cardButtonLabel}
            contentStyle={{ backgroundColor: COLORS.primary }}
            accessibilityLabel={`Ver detalhes da receita ${item.title}`}
          >
            Ver Detalhes
          </Button>
        </LinearGradient>
      </View>
    );
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => <ListItem item={item} />;

  const sections = [
    {
      title: "Café da Manhã",
      key: "breakfast",
      data: filteredBreakfast,
      renderItem: renderRecipeItem,
    },
    {
      title: "Almoço",
      key: "lunch",
      data: filteredLunch,
      renderItem: renderRecipeItem,
    },
    {
      title: "Jantar",
      key: "dinner",
      data: filteredDinner,
      renderItem: renderRecipeItem,
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content
          title="João Silva"
          titleStyle={styles.appBarTitle}
        />
        <Avatar.Icon
          icon="account"
          size={40}
          style={styles.userAvatar}
          theme={{ colors: { primary: COLORS.primary } }}
          accessibilityLabel="Perfil do usuário"
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor={COLORS.shadow}
          style={styles.searchInput}
          theme={{ colors: { primary: COLORS.shadow } }}
          right={<TextInput.Icon icon="magnify" color={COLORS.shadow} />}
          accessibilityLabel="Campo de pesquisa"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />

        {sections.map((section) => (
          <View key={section.key}>
            {section.data.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={section.renderItem}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.listContainer}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  Nenhuma receita encontrada para {section.title.toLowerCase()}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
