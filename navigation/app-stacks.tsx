import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import SetsScreen from "../screens/SetsScreen";
import PartsScreen from "../screens/SetsScreen";
import MinifigsScreen from "../screens/MinifigsScreen";

// Define view names and associated params
// undefined = no params passed to view
export type RootStackParamList = {
  Sets: undefined;
  Parts: undefined;
  Minifigs: undefined;
};

// Define view stack inside Sets tab
const SetsStack = createStackNavigator<RootStackParamList>();
export const SetsStackScreen = () => {
  return (
    <SetsStack.Navigator
      screenOptions={{
        headerTintColor: "tomato",
        headerStyle: { backgroundColor: "white" },
      }}
    >
      <SetsStack.Screen name="Sets" component={SetsScreen} />
      <SetsStack.Screen name="Parts" component={PartsScreen} />
    </SetsStack.Navigator>
  );
};

// Define view stack inside Parts tab
const PartsStack = createStackNavigator<RootStackParamList>();
export const PartsStackScreen = () => {
  return (
    <PartsStack.Navigator>
      <PartsStack.Screen name="Parts" component={PartsScreen} />
      <PartsStack.Screen name="Minifigs" component={MinifigsScreen} />
    </PartsStack.Navigator>
  );
};

export interface SetsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Sets">;
}

export interface MinifigsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Minifigs">;
}

export interface PartsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Parts">;
}
