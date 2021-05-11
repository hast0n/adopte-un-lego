import React, { Component } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import LegoTheme from "../services/legotheme.model";
import LegoSet from "../services/legoset.model";

interface SetInformationBlockProps {
  set: LegoSet;
  theme: LegoTheme;
}

export default class SetInformationBlock extends Component<
  SetInformationBlockProps,
  {}
> {
  render() {
    return (
      <View style={styles.sectionContent}>
        <View
          style={{
            height: 90,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.key}>
            Nuber of parts in this set:
            <Text style={styles.value}> {this.props.set.NumParts}</Text>
          </Text>
          <Text style={styles.key}>
            Release year:
            <Text style={styles.value}> {this.props.set.Year}</Text>
          </Text>
          <Text style={styles.key}>
            Series:
            <Text style={styles.value}> {this.props.theme.Name}</Text>
          </Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(this.props.set.SetUrl)}
          >
            See more info on Rebrickable...
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    color: "blue",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  key: {
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
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
