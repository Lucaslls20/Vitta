import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import { Recipe } from "../../../Models/HealthModel";
import { View, Image, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../../../View/PagesBottomTabs/Health/styles";
import { COLORS } from "../../../View/Colors";
import { useNavigation } from "@react-navigation/native"; // Importa o hook
import { NavigationProps } from "../../../App";

export const ListItem = ({ item }: { item: Recipe }) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const unsplashFallback =
    "https://blog.consumer.com.br/wp-content/uploads/2020/11/culin%C3%A1ria-regional-brasileira.jpg";
  const imageUrl = imageError ? unsplashFallback : item.image;


  const navigation = useNavigation<NavigationProps>();

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
          onPress={() =>
            navigation.navigate("SeeDetails", { recipeId: item.id })
          }
          style={styles.cardButton}
          labelStyle={styles.cardButtonLabel}
          contentStyle={{ backgroundColor: COLORS.primary }}
          accessibilityLabel={`See details about recipe ${item.title}`}
        >
         See Details
        </Button>
      </LinearGradient>
    </View>
  );
};
