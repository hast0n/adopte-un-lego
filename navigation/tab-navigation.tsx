import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  RootStackParamList,
  SetsStackScreen,
  PartsStackScreen,
  MinifigsStackScreen,
} from "./app-stacks";

// Define main tab navigator
const Tab = createBottomTabNavigator<RootStackParamList>();

export const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any; // TODO: find better type

            if (route.name === "Sets") {
              iconName = focused ? "ios-cube" : "ios-cube-outline";
            } else if (route.name === "Parts") {
              iconName = focused ? "ios-apps" : "ios-apps-outline";
            } else if (route.name === "Minifigs") {
              iconName = focused ? "ios-man" : "ios-man-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Sets"
          component={SetsStackScreen}
          options={{ title: "Lego Sets" }}
        />
        <Tab.Screen
          name="Minifigs"
          component={MinifigsStackScreen}
          options={{ title: "Minifigs" }}
        />
        <Tab.Screen
          name="Parts"
          component={PartsStackScreen}
          options={{ title: "Lego Parts" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
