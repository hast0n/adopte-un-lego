import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LegoPart from "../services/legopart.model";

interface PartTileProps {
  part: LegoPart;
  onPartPress: (LegoPart) => void;
}

export default class PartTile extends Component<PartTileProps, {}> {
  render() {
    return (
      <TouchableOpacity
        key={this.props.part.ID + Math.random()}
        onPress={() => this.props.onPartPress(this.props.part.Name)}
      >
        <Image
          source={{ uri: this.props.part.ImgUrl }}
          style={styles.partImg}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>

        <View style={{ flexDirection: "row", width: 70 }}>
          <Text style={styles.partQuantity}>x{this.props.part.quantity}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ marginRight: 10 }}
          >
            {this.props.part.Name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  partImg: {
    height: 80,
    width: 80,
  },
  partQuantity: {
    flex: 0,
    paddingHorizontal: 6,
    borderRadius: 100,
    backgroundColor: "lightgray",
    marginBottom: 15,
  },
});
