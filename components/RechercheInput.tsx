import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class RechercheInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="search" size={30} color="black" />
        <TextInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
    height: 50,
    width: 280,
    fontSize: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
