import React, { Component } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import LegoSet from "../services/legoset.model";
import SetItem from "../components/SetItem";

interface SetFlatlistProps {
  itemList: Array<LegoSet>;
  legoSetPress: (LegoSet) => void;
  onEndReached: ((info: { distanceFromEnd: number }) => void) | null;
}

export default class SetFlatlist extends Component<SetFlatlistProps, {}> {
  render() {
    return (
      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        key={1}
        data={this.props.itemList}
        style={styles.list}
        renderItem={({ item }: { item: LegoSet }) => (
          <SetItem item={item} legoSetPress={this.props.legoSetPress} />
        )}
        keyExtractor={(item, i) => item.ID + i}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={1}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: "stretch",
    height: "100%",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginVertical: 10,
  },
});
