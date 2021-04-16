import { StatusBar } from "expo-status-bar";
import React from "react";
import { TabNavigator } from "./navigation/tab-navigation";
import { StyleSheet, Text, View } from "react-native";
import legodbapiService from "./services/legodbapi.service";

export default function App() {
  return <TabNavigator />;
}
