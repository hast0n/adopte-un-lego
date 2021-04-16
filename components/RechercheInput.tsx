import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class RechercheInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="search" size={30} color="black" />
        <TextInput style={styles.textInput} placeholder="Rechercher" />
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
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
