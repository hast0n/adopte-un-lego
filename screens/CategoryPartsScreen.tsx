import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CategoryPartsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import LegoPart from "../services/legopart.model";

interface CategoryPartsScreenState {
  listParts: Array<LegoPart>;
}

export default class CategoryPartsScreen extends Component<
  CategoryPartsScreenProps,
  CategoryPartsScreenState
> {
  state: CategoryPartsScreenState = {
    listParts: [],
  };

  componentDidMount() {
    legodbapi
      .getPartByCategoryId(this.props.route.params.id)
      .then((parts) => this.setState({ listParts: parts }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.route.params.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    alignSelf: "flex-start",
    color: "tomato",
    fontSize: 16,
    marginHorizontal: 22,
    marginBottom: 10,
  },
});
