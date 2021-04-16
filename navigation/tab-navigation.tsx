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
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Parts") {
              iconName = focused ? "ios-list-sharp" : "ios-list-outline";
            } else if (route.name === "Minifigs") {
              iconName = focused ? "ios-list-sharp" : "ios-list-outline";
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
        <Tab.Screen name="Parts" component={PartsStackScreen} />
        <Tab.Screen name="Sets" component={SetsStackScreen} />
        <Tab.Screen name="Minifigs" component={MinifigsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
