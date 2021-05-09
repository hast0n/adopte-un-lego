import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Divider } from "react-native-elements";
import { SetsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import Input from "../components/Input";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoMinifig from "../services/legominifig.model";
import { MinifigDetailScreenProps } from "../navigation/app-stacks";

interface MinifigDetailScreenState {
  minifig: LegoMinifig;
  theme: LegoTheme;
}

export default class MinifigDetailScreen extends Component<
  MinifigDetailScreenProps,
  MinifigDetailScreenState
> {
  state: MinifigDetailScreenState = {
    minifig: {
      ID: undefined,
      ImgUrl: undefined,
      LastModified: undefined,
      Name: undefined,
      NumParts: undefined,
      FigUrl: undefined,
    },
    theme: {
      ID: undefined,
      Name: undefined,
      ParentID: undefined,
    },
  };

  componentDidMount() {
    legodbapi
      .getLegoMinifigById(this.props.route.params.id)
      .then((legoMinifig) => {
        this.setState({ minifig: legoMinifig });
      });
  }

  render() {
    const minifig = this.state.minifig;
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.picture}
          source={{ uri: minifig.ImgUrl }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>
        <View style={styles.infos}>
          <Text style={styles.title}>{minifig.Name}</Text>
          <Divider style={styles.divider}></Divider>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "white" },
  picture: {
    flex: 1,
    minHeight: 300,
    width: "100%",
    alignSelf: "stretch",
  },
  infos: {},
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
});
