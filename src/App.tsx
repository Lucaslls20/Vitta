import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./View/Autentication/Login";
import Register from "./View/Autentication/Register";
import SplashScreen from "./View/Autentication/SplashScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./View/PagesBottomTabs/Home";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined
    Register: undefined
    SplashScreen: undefined
    Tabs: undefined
}

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

function TabRoutes(){
    return(
    <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }: IconProps) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
    )
}

export default function App(){
    return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
    </Stack.Navigator>
    </NavigationContainer>
    )
}