import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image, Linking } from "react-native";
import { Divider } from "react-native-elements";
import legodbapi from "../services/legodbapi.service";
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
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.title}>{minifig.Name}</Text>
              <Text style={styles.id}>ID: {minifig.ID}</Text>
            </View>
            <Text style={styles.infoHint}>Information about this Minifig</Text>
            <Divider style={styles.divider}></Divider>
            <View style={{ height: 50, justifyContent: "space-between" }}>
              <Text style={styles.key}>
                Number of parts in this set:
                <Text style={styles.value}> {minifig.NumParts}</Text>
              </Text>
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(minifig.FigUrl)}
              >
                See more info on Rebrickable...
              </Text>
              {/* <Text style={styles.key}>Date de dernière modification :</Text>
              <Text style={styles.value}> {minifig.LastModified}</Text> */}
            </View>
          </View>
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
  infos: { margin: 10 },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  key: {
    fontSize: 15,
  },
  link: {
    color: "blue",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  id: {
    fontStyle: "italic",
    color: "gray",
  },
  infoHint: {
    marginTop: 20,
    color: "tomato",
    fontSize: 21,
    marginBottom: 0,
    fontWeight: "bold",
  },
});
