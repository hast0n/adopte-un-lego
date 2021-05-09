import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import Input from "../components/Input";

interface MinifigsScreenHeaderProps {
  onSearchSubmit: (text: string) => void;
  bringBackThemes: () => void;
}

export default class MinifigsScreenHeader extends Component<
  MinifigsScreenHeaderProps,
  {}
> {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.hint}>
          Search a Minifig by name or browse the collection by theme
        </Text>
        <Input
          onSubmitEditing={this.props.onSearchSubmit}
          placeholder="Search a Minifig"
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
    fontSize: 18,
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
