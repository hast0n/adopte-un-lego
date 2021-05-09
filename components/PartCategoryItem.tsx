import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PartCategory from "../services/partcategory.model";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PartCategoryItemProps {
  category: PartCategory;
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
          onPress={() => null}
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
  },
  text: {
    fontSize: 18,
  },
});
