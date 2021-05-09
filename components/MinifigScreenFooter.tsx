import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import Input from "../components/Input";

interface MinifigsScreenFooterProps {
  pageNumber: number;
  onClickLeft: () => void;
  onClickRight: () => void;
}

export default class MinifigsScreenFooter extends Component<
  MinifigsScreenFooterProps,
  {}
> {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.onClickLeft}
        >
          <Text style={styles.button}>Previous page </Text>
        </TouchableOpacity>
        <Text> -- Page {this.props.pageNumber} -- </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.onClickRight}
        >
          <Text style={styles.button}> Next page</Text>
        </TouchableOpacity>
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
  button: {
    fontSize: 10,
    backgroundColor: "white",
    color: "blue",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  header: {
    alignItems: "center",
    height: 30,
    flexDirection: "row",
  },
});
