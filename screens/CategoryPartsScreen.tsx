import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { CategoryPartsScreenProps } from "../navigation/app-stacks";
import PartCategory from "../services/partcategory.model";
import legodbapi from "../services/legodbapi.service";
import PartCategoryItem from "../components/PartCategoryItem";

export default class CategoryPartsScreen extends Component<
  CategoryPartsScreenProps,
  {}
> {
  render() {
    //const { navigation } = this.props;

    return (
      <View>
        <Text>categoryyy partsss</Text>
      </View>
    );
  }
}

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
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
  title: {
    alignSelf: "flex-start",
    color: "tomato",
    fontSize: 16,
    marginHorizontal: 22,
    marginBottom: 10,
  },
});
