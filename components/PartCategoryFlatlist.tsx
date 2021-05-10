import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PartCategory from "../services/partcategory.model";
import PartCategoryItem from "./PartCategoryItem";

interface PartCategoryFlatlistProps {
  listCategories: Array<PartCategory>;
  onPressCategory: (PartCategory) => void;
}

export default class PartCategoryFlatlist extends Component<
  PartCategoryFlatlistProps,
  {}
> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.listCategories}
          renderItem={({ item }: { item: PartCategory }) => (
            <PartCategoryItem
              category={item}
              onPressCategory={this.props.onPressCategory}
            />
          )}
          keyExtractor={(item) => item.ID.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
