import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import Input from "../components/Input";
import { Divider } from "react-native-elements/dist/divider/Divider";

interface ThemeSearchScreenHeaderProps {
  themeName: string;
  onSearchSubmit: (string) => void;
  onSearchReset: () => void;
}

export default class ThemeSearchScreenHeader extends Component<
  ThemeSearchScreenHeaderProps,
  {}
> {
  render() {
    return (
      <>
        <Text style={styles.title}>
          Results for theme :{" "}
          <Text style={{ fontWeight: "bold" }}>{this.props.themeName}</Text>
        </Text>
        <Input
          placeholder={`Search a ${this.props.themeName} related set `}
          clearAfterSubmit={false}
          onSubmitEditing={this.props.onSearchSubmit}
          onDismissPress={this.props.onSearchReset}
          showDismissButton={true}
        />
        <Divider style={styles.divider}></Divider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  title: {
    alignSelf: "flex-start",
    color: "tomato",
    fontSize: 18,
    marginHorizontal: 22,
    marginBottom: 10,
  },
});
