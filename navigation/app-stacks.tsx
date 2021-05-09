import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import SetsScreen from "../screens/SetsScreen";
import PartsScreen from "../screens/SetsScreen";
import MinifigsScreen from "../screens/MinifigsScreen";
import SetDetailScreen from "../screens/SetDetailScreen";
<<<<<<< HEAD
import MinifigDetailScreen from "../screens/MinifigDetailScreen";
=======
import ThemeSearchScreen from "../screens/ThemeSearchScreen";
import LegoSet from "../services/legoset.model";
>>>>>>> 42cab7e178e8fd478ea6a56714c05357c479be67

// Define view names and associated params
// undefined = no params passed to view
export type RootStackParamList = {
  Sets: undefined;
  Parts: undefined;
  Minifigs: undefined;
  SetDetails: { id: string };
<<<<<<< HEAD
  MinifigDetails: { id: string };
  ThemeSearch: { id: string };
=======
  ThemeSearch: { id: number; legoSetPress: (item: LegoSet) => void };
>>>>>>> 42cab7e178e8fd478ea6a56714c05357c479be67
};

// Define view stack inside Sets tab
const SetsStack = createStackNavigator<RootStackParamList>();
export const SetsStackScreen = () => {
  return (
    <SetsStack.Navigator
      screenOptions={{
        headerTintColor: "tomato",
        headerStyle: { backgroundColor: "white" },
        title: "Lego Sets",
      }}
    >
      <SetsStack.Screen name="Sets" component={SetsScreen} />
      <SetsStack.Screen name="SetDetails" component={SetDetailScreen} />
      <SetsStack.Screen name="ThemeSearch" component={ThemeSearchScreen} />
    </SetsStack.Navigator>
  );
};

// // Define view stack inside Sets tab
// const SetDetailStack = createStackNavigator<RootStackParamList>();
// export const SetDetailStackScreen = () => {
//   return (
//     <SetDetailStack.Navigator
//       screenOptions={{
//         headerTintColor: "tomato",
//         headerStyle: { backgroundColor: "white" },
//       }}
//     >
//       <SetsStack.Screen name="Sets" component={SetsScreen} />
//       <SetsStack.Screen name="SetDetails" component={SetDetailScreen} />
//     </SetDetailStack.Navigator>
//   );
// };

// Define view stack inside Parts tab
const PartsStack = createStackNavigator<RootStackParamList>();
export const PartsStackScreen = () => {
  return (
    <PartsStack.Navigator
      screenOptions={{
        headerTintColor: "tomato",
        headerStyle: { backgroundColor: "white" },
        title: "Lego Parts",
      }}
    >
      <PartsStack.Screen name="Parts" component={PartsScreen} />
    </PartsStack.Navigator>
  );
};

// Define view stack inside Minifigs tab
const MinifigsStack = createStackNavigator<RootStackParamList>();
export const MinifigsStackScreen = () => {
  return (
    <MinifigsStack.Navigator
      screenOptions={{
        headerTintColor: "tomato",
        headerStyle: { backgroundColor: "white" },
        title: "Lego Minifigs",
      }}
    >
      <MinifigsStack.Screen name="Minifigs" component={MinifigsScreen} />
      <SetsStack.Screen name="MinifigDetails" component={MinifigDetailScreen} />
    </MinifigsStack.Navigator>
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

export interface SetDetailScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "SetDetails">;
  route: RouteProp<RootStackParamList, "SetDetails">;
}

export interface MinifigDetailScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "MinifigDetails">;
}

export interface ThemeSearchScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "ThemeSearch">;
  route: RouteProp<RootStackParamList, "ThemeSearch">;
}
