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
    backgroundColor: "#FFDE75",
    height: 40,
    paddingLeft: 30,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "dimgray",
  },
});
