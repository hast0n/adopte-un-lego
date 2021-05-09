import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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
        <Button title={"leftBtn"} onPress={this.props.onClickLeft}>
          Previous page
        </Button>
        <Text>{this.props.pageNumber}</Text>
        <Button title={"rightBtn"} onPress={this.props.onClickRight}>
          Next page
        </Button>
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
    height: 30,
    flexDirection: "row",
  },
});
