import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class SetsScreen extends Component {
  render() {
    return (
      <View style={styles.emptiness}>
        <Text>Wow much empty...</Text>
        <Text style={{ marginTop: 20, fontSize: 30, color: "lightgray" }}>
          ¯\_(ツ)_/¯
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptiness: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
