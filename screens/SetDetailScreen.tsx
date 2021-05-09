import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image, Linking } from "react-native";
import { Divider } from "react-native-elements";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoSet from "../services/legoset.model";
import { SetDetailScreenProps } from "../navigation/app-stacks";
import LegoPart from "../services/legopart.model";

interface SetDetailScreenState {
  set: LegoSet;
  theme: LegoTheme;
  parts: LegoPart[];
}

export default class SetDetailScreen extends Component<
  SetDetailScreenProps,
  SetDetailScreenState
> {
  state: SetDetailScreenState = {
    set: {
      ID: undefined,
      ImgUrl: undefined,
      LastModified: undefined,
      Name: undefined,
      NumParts: undefined,
      SetUrl: undefined,
      ThemeID: undefined,
      Year: undefined,
    },
    theme: {
      ID: undefined,
      Name: undefined,
      ParentID: undefined,
    },
    parts: [],
  };

  componentDidMount() {
    legodbapi.getLegoSetById(this.props.route.params.id).then((legoSet) => {
      this.setState({ set: legoSet });

      legodbapi.getThemeByID(this.state.set.ThemeID).then((legoTheme) => {
        this.setState({ theme: legoTheme });
      });

      legodbapi
        .getPartsBySetID(this.props.route.params.id)
        .then((legoParts) => {
          this.setState({ parts: legoParts });
        });
    });
  }

  render() {
    const set = this.state.set;
    const theme = this.state.theme;
    const parts = this.state.parts;
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.picture}
          source={{ uri: set.ImgUrl }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>
        <View style={styles.infos}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 0.6 }}>
              <Text style={styles.title}>{set.Name}</Text>
              <Text style={styles.id}>ID: {set.ID}</Text>
            </View>
            <Image
              style={styles.logo}
              source={{
                uri: legodbapi.getThemeLogoUrlById(theme.ID),
              }}
              resizeMethod={"scale"}
              resizeMode={"contain"}
            ></Image>
          </View>
          <Text style={styles.infoHint}>Information about this set</Text>
          <Divider style={styles.divider}></Divider>
          <View style={{ height: 90, justifyContent: "space-between" }}>
            <Text style={styles.key}>
              Nuber of parts in this set:
              <Text style={styles.value}> {set.NumParts}</Text>
            </Text>
            <Text style={styles.key}>
              Release year:
              <Text style={styles.value}> {set.Year}</Text>
            </Text>
            <Text style={styles.key}>
              Series:
              <Text style={styles.value}> {theme.Name}</Text>
            </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(set.SetUrl)}
            >
              See more info on Rebrickable...
            </Text>
          </View>

          <Text style={styles.infoHint}>Parts included in this set</Text>

          {[...parts].map((part) => {
            return (
              <View key={part.ID + Math.random()} style={styles.partStack}>
                <Image
                  source={{ uri: part.ImgUrl }}
                  style={styles.part}
                  resizeMethod={"scale"}
                  resizeMode={"contain"}
                ></Image>
              </View>
            );
          })}

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
  infos: {
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
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
  infoHint: {
    marginTop: 20,
    color: "tomato",
    fontSize: 21,
    marginBottom: 0,
    fontWeight: "bold",
  },
  partStack: {
    backgroundColor: "blue",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  part: {
    backgroundColor: "red",

    height: 100,
    width: 100,
  },
});
