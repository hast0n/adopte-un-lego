import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import Input from "../components/Input";

interface SetsScreenHeaderProps {
  onSearchSubmit: (text: string) => void;
  bringBackThemes: () => void;
}

export default class SetsScreenHeader extends Component<
  SetsScreenHeaderProps,
  {}
> {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.hint}>
          Search a Lego set by name or browse the collection by theme
        </Text>
        <Input
          onSubmitEditing={this.props.onSearchSubmit}
          placeholder="Search a Lego set"
          clearAfterSubmit={false}
          showDismissButton={true}
          onDismissPress={this.props.bringBackThemes}
        />
        <Divider style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hint: {
    marginHorizontal: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 12,
    color: "gray",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  header: {
    alignItems: "center",
  },
});
