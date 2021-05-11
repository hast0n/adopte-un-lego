import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import PartCategory from "../services/partcategory.model";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PartCategoryItemProps {
  category: PartCategory;
  onPressCategory: (PartCategory) => void;
}

export default class PartCategoryItem extends Component<
  PartCategoryItemProps,
  {}
> {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPressCategory(this.props.category)}
      >
        <Text style={styles.text}>{this.props.category.Name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    height: 40,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: "silver",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "tomato",
    alignSelf: "center",
  },
});
