import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import LegoTheme from "../services/legotheme.model";
import ThemeItem from "./ThemeItem";

interface ThemeFlatlistProps {
  itemList: Array<LegoTheme>;
  legoThemePress: (item: LegoTheme) => void;
}

export default class ThemeFlatlist extends Component<ThemeFlatlistProps, {}> {
  render() {
    return (
      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        numColumns={3}
        key={3}
        data={this.props.itemList}
        style={styles.list}
        renderItem={({ item }: { item: LegoTheme }) => (
          <ThemeItem item={item} legoThemePress={this.props.legoThemePress} />
        )}
        keyExtractor={(item) => item.ID.toString()}
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
