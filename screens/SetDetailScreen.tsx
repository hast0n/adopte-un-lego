import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Divider } from "react-native-elements";
import { SetsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import Input from "../components/Input";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoSet from "../services/legoset.model";
import { SetDetailScreenProps } from "../navigation/app-stacks";

interface SetDetailScreenState {
  set: LegoSet;
  theme: LegoTheme;
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
  };

  componentDidMount() {
    legodbapi.getLegoSetById(this.props.route.params.id).then((legoSet) => {
      this.setState({ set: legoSet });
    });
    legodbapi.getThemeByID(this.state.set.ThemeID).then((legoTheme) => {
      this.setState({ theme: legoTheme });
    });
  }

  render() {
    const set = this.state.set;
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.picture}
          source={{ uri: set.ImgUrl }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>
        <View style={styles.infos}>
          <Text style={styles.title}>{set.Name}</Text>
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
