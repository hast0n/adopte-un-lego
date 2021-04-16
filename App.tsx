import { StatusBar } from "expo-status-bar";
import React from "react";
import { TabNavigator } from "./navigation/tab-navigation";
import { StyleSheet, Text, View } from "react-native";
import legodbapiService from "./services/legodbapi.service";

export default function App() {
  console.log(
    legodbapiService.fetchSetsFromApi(
      "https://rebrickable.com/api/v3/lego/minifigs/fig-010124/?key=804ce1e3431c0498af9ca6e60bb6e27d"
    )
  );
  return <TabNavigator />;
}
