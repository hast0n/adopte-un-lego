import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import LegoSet from "../services/legoset.model";

interface SetPresentationBlockProps {
  set: LegoSet;
  theme: LegoTheme;
}

export default class SetPresentationBlock extends Component<
  SetPresentationBlockProps,
  {}
> {
  render() {
    return (
      <View style={[styles.sectionContent, { marginTop: 15 }]}>
        <Image
          style={styles.picture}
          source={{ uri: this.props.set.ImgUrl }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>
        <View>
          <View style={styles.mainInfo}>
            <View style={{ flex: 0.6 }}>
              <Text style={styles.title}>{this.props.set.Name}</Text>
              <Text style={styles.id}>ID: {this.props.set.ID}</Text>
            </View>
            <Image
              style={styles.logo}
              source={{
                uri: legodbapi.getThemeLogoUrlById(this.props.theme.ID),
              }}
              resizeMethod={"scale"}
              resizeMode={"contain"}
            ></Image>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    minHeight: 300,
    width: "100%",
    alignSelf: "stretch",
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  logo: {
    flex: 0.5,
    height: "100%",
    alignSelf: "center",
  },
  id: {
    fontStyle: "italic",
    color: "gray",
  },
  sectionContent: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
    shadowColor: "black",
    borderRadius: 10,
    elevation: 4,
  },
});
