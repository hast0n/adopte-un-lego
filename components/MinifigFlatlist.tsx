import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import LegoMinifig from "../services/legominifig.model";
import MinifigItem from "../components/MinifigItem";

interface MinifigFlatlistProps {
  itemList: Array<LegoMinifig>;
  legoMinifigPress: (LegoMinifig) => void;
}

export default class MinifigFlatlist extends Component<
  MinifigFlatlistProps,
  {}
> {
  render() {
    return (
      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        key={2}
        data={this.props.itemList}
        style={styles.list}
        renderItem={({ item }: { item: LegoMinifig }) => (
          <MinifigItem
            item={item}
            legoMinifigPress={this.props.legoMinifigPress}
          />
        )}
        keyExtractor={(item) => item.ID}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: "stretch",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginVertical: 10,
  },
});
