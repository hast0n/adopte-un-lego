import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LegoMinifig from "../services/legoset.model";

interface MinifigItemProps {
  item: LegoMinifig;
  legoMinifigPress: (LegoMinifig) => void;
}

export default class MinifigItem extends Component<MinifigItemProps, {}> {
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={{ height: "100%", width: "100%" }}
          onPress={() => this.props.legoMinifigPress(this.props.item)}
        >
          <Image
            style={styles.picture}
            source={{ uri: this.props.item.ImgUrl }}
            resizeMethod={"scale"}
            resizeMode={"contain"}
          ></Image>
          <View style={styles.info}>
            <Text style={styles.name}>{this.props.item.Name}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.year}>{this.props.item.Year}</Text>
              <Text style={styles.id}>{this.props.item.ID}</Text>
            </View>
            <Text style={styles.nbParts}>
              ({this.props.item.NumParts} parts)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
  item: {
    overflow: "hidden",
    flex: 0.47,
    height: 250,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  picture: {
    flex: 1,
    height: undefined,
    width: "100%",
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    marginVertical: 2,
  },
  id: {
    fontStyle: "italic",
    color: "gray",
  },
  nbParts: {
    fontStyle: "italic",
    color: "gray",
  },
  year: {
    fontStyle: "italic",
    color: "gray",
  },
  info: { margin: 7 },
});
