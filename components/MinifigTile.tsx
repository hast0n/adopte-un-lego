import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Linking, Modal } from "react-native";
import { Divider } from "react-native-elements";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoSet from "../services/legoset.model";
import { SetDetailScreenProps } from "../navigation/app-stacks";
import LegoPart from "../services/legopart.model";
import Toast from "react-native-fast-toast";
import LegoMinifig from "../services/legominifig.model";

interface MinifigTileProps {
  fig: LegoMinifig;
  showToastMessage: (string) => void;
}

export default class MinifigTile extends Component<MinifigTileProps, {}> {
  render() {
    return (
      <TouchableOpacity
        key={this.props.fig.ID + Math.random()}
        onPress={() => this.props.showToastMessage(this.props.fig.Name)}
      >
        <Image
          source={{ uri: this.props.fig.ImgUrl }}
          style={styles.partImg}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>

        <View style={{ flexDirection: "row", width: 70 }}>
          <Text style={styles.partQuantity}>x{this.props.fig.quantity}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ marginRight: 10 }}
          >
            {this.props.fig.Name}
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
