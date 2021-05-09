import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ThemeItemProps {
  item: LegoTheme;
  legoThemePress: (item: LegoTheme) => void;
}

export default class ThemeItem extends Component<ThemeItemProps, {}> {
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={{ height: "100%", width: "100%" }}
          onPress={() => this.props.legoThemePress(this.props.item)}
        >
          <Image
            style={styles.picture}
            source={{
              uri: legodbapi.getThemePictureUrlById(this.props.item.ID),
            }}
          ></Image>
          <Image
            style={styles.logo}
            source={{ uri: legodbapi.getThemeLogoUrlById(this.props.item.ID) }}
            resizeMethod={"scale"}
            resizeMode={"contain"}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    overflow: "hidden",
    width: 115,
    height: 130,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  logo: {
    flex: 1,
    width: "90%",
    height: undefined,
    alignSelf: "center",
    marginBottom: 3,
  },
  picture: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
});
