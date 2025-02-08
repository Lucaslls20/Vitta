import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./View/Autentication/Login";
import Register from "./View/Autentication/Register";
import SplashScreen from "./View/Autentication/SplashScreen";
import Home from "./View/PagesBottomTabs/Home";
import SeeDetails from "./View/PagesBottomTabs/SeeDetails";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS } from "./View/Colors";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined
  Register: undefined
  SplashScreen: undefined
  Tabs: undefined
  SeeDetails: { recipeId: number }
}
export type SeeDetailsRouteProp = RouteProp<RootStackParamList, 'SeeDetails'>;

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export type RootTabParamList = {
  Home: undefined
}

type IconProps = {
  color: string;
  size: number;
};

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: COLORS.white,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.shadow,
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }: IconProps) => (
          <Icon name="home" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen
          name="SeeDetails"
          component={SeeDetails}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}