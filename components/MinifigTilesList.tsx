import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LegoMinifig from "../services/legominifig.model";
import MinifigTile from "../components/MinifigTile";

interface MinifigTilesListProps {
  minifigs: Array<LegoMinifig>;
  onMinifigPress: (LegoMinifig) => void;
}

export default class MinifigTilesList extends Component<
  MinifigTilesListProps,
  {}
> {
  render() {
    const minifigs = this.props.minifigs;
    if (minifigs.length > 0) {
      return (
        <View style={styles.partStack}>
          {[...this.props.minifigs].map((fig, i) => {
            //return this.renderMinifig(fig);
            return (
              <MinifigTile
                fig={fig}
                key={fig.ID + i}
                showToastMessage={this.props.onMinifigPress}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ fontStyle: "italic" }}>No minifig to display...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  partStack: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
