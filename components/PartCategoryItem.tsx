import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
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
      <View style={styles.container}>
        <TouchableOpacity
          style={{ height: "100%", width: "100%" }}
          onPress={() => this.props.onPressCategory(this.props.category)}
        >
          <Text style={styles.text}>{this.props.category.Name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    height: 40,
    paddingLeft: 30,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
  },
});
