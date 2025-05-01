import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./View/Autentication/Login";
import Register from "./View/Autentication/Register";
import SplashScreen from "./View/Autentication/SplashScreen";
import Home from "./View/PagesBottomTabs/Home";
import SeeDetails from "./View/PagesBottomTabs/SeeDetails";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS } from "./View/Colors";
import { RouteProp } from "@react-navigation/native";
import Health from "./View/PagesBottomTabs/Health";
import Profile from "./View/PagesBottomTabs/Profile";
import EditProfile from "./View/EditProfile";
import TermsAndConditionsScreen from "./View/TermsAndConditionsScreen"; 
import PrivacyPolicyScreen from "./View/PrivacyPolicy";
import GraphicScreen from "./View/PagesBottomTabs/Graphic";
import Settings from "./View/Settings";
import Goals from "./View/Goals";
import FavoriteRecipesScreen from "./View/FavoriteRecipes";
import ChallengesScreen from "./View/Challenges";
import HelpFeedbackScreen from "./View/HelpFeedbackScreen";
import AboutScreen from "./View/AboutAppScreen/index";
import { ThemeProvider, ThemeContext } from "./View/theme";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { StatusBar } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  SplashScreen: undefined;
  Tabs: undefined;
  SeeDetails: { recipeId: number };
  EditProfile: undefined;
  TermsAndConditionsScreen: undefined;
  PrivacyPolicyScreen: undefined;
  Settings: undefined;
  Goals: undefined;
  FavoriteRecipeScreen: undefined
  ChallengesScreen: undefined
  HelpFeedbackScreen: undefined
  AboutScreen: undefined
};

export type SeeDetailsRouteProp = RouteProp<RootStackParamList, 'SeeDetails'>;

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export type RootTabParamList = {
  Home: undefined;
  Daily: undefined;
  Profile: undefined;
  Graphic: undefined;
};

type IconProps = {
  color: string;
  size: number;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
};

// Componente interno para gerenciar os temas da aplicação
const ThemedApp = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Customização do tema para o React Navigation
  const navigationTheme = isDarkMode 
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: COLORS.primary,
          background: COLORS.text.primary,
          card: COLORS.text.primary,
          text: COLORS.text.light,
        }
      } 
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: COLORS.primary,
          background: COLORS.white,
          card: COLORS.white,
          text: COLORS.text.primary,
        }
      };

  // Customização do tema para o Paper
  const paperTheme = isDarkMode
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: COLORS.primary,
          secondary: COLORS.secondary,
          accent: COLORS.accent,
          background: COLORS.text.primary,
          surface: COLORS.text.primary,
          text: COLORS.text.light,
          onSurface: COLORS.text.secondary,
          error: COLORS.error,
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: COLORS.primary,
          secondary: COLORS.secondary,
          accent: COLORS.accent,
          background: COLORS.white,
          surface: COLORS.white,
          text: COLORS.text.primary,
          onSurface: COLORS.text.secondary,
          error: COLORS.error,
        },
      };

  function TabRoutes() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: COLORS.secondary,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.shadowApp,
          tabBarStyle: { 
            backgroundColor: isDarkMode ? COLORS.text.primary : COLORS.white 
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }: IconProps) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Daily"
          component={Health}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }: IconProps) => (
              <MaterialIcons name="energy-savings-leaf" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Graphic"
          component={GraphicScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }: IconProps) => (
              <Foundation name="graph-bar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }: IconProps) => (
              <FontAwesome name="user-circle-o" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar 
        backgroundColor={COLORS.primary} 
        barStyle={isDarkMode ? 'dark-content' : 'light-content'} 
      />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Tabs" component={TabRoutes} options={defaultScreenOptions} />
          <Stack.Screen name="SeeDetails" component={SeeDetails} options={defaultScreenOptions} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={defaultScreenOptions} />
          <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} options={defaultScreenOptions} />
          <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={defaultScreenOptions} />
          <Stack.Screen name="Settings" component={Settings} options={defaultScreenOptions} />
          <Stack.Screen name='Goals' component={Goals} options={defaultScreenOptions} />
          <Stack.Screen name='FavoriteRecipeScreen' component={FavoriteRecipesScreen} options={defaultScreenOptions} />
          <Stack.Screen name='ChallengesScreen' component={ChallengesScreen} options={defaultScreenOptions} />
          <Stack.Screen name='HelpFeedbackScreen' component={HelpFeedbackScreen} options={defaultScreenOptions} />
          <Stack.Screen name='AboutScreen' component={AboutScreen} options={defaultScreenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}