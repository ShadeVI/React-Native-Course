import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Ionicons} from "@expo/vector-icons"

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import CategoriesScreen from "./screens/CategoriesScreen";
import { useCallback } from "react";
import MealsOverviewScreen from "./components/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FavoritesContextProvider from "./store/context/favorites-context";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return <Drawer.Navigator screenOptions={{
    headerStyle: { backgroundColor: '#351401' },
    headerTintColor: '#ccc',
    sceneContainerStyle: { backgroundColor: '#3f2f25' },
    drawerContentStyle: { backgroundColor: '#3f2f25' },
    drawerInactiveTintColor: 'white',
    drawerActiveTintColor: '#3f2f25',
    drawerActiveBackgroundColor: '#e4baa1'
  }} >
    <Drawer.Screen name="Categories" component={CategoriesScreen} options={{
      drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name="list" />
    }} />
    <Drawer.Screen name="Favorites" component={FavoritesScreen} options={{
      drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name="star" />
    }} />
  </Drawer.Navigator>
}

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontsError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MealsCategories"
            screenOptions={{
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: '#ccc',
              contentStyle: { backgroundColor: '#3f2f25' }
            }}>
            <Stack.Screen
              name="DrawerScreen"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
            /* options={({route, navigation}) => {
              const catId = route.params.categoryId
              return {
                title: CATEGORIES.find(el => el.id === catId).title
              }
            }} */
            />
            <Stack.Screen
              name="MealDetails"
              component={MealDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
