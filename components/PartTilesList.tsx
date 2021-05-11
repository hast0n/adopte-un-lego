import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LegoPart from "../services/legopart.model";
import PartTile from "../components/PartTile";

interface PartTilesListProps {
  parts: Array<LegoPart>;
  onPartPress: (LegoPart) => void;
}

export default class PartTilesList extends Component<PartTilesListProps, {}> {
  render() {
    const parts = this.props.parts;
    if (parts.length > 0) {
      return (
        <View style={styles.partStack}>
          {[...this.props.parts].map((part, i) => {
            return (
              <PartTile
                part={part}
                onPartPress={this.props.onPartPress}
                key={part.ID + i}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ fontStyle: "italic" }}>No parts to display...</Text>
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
