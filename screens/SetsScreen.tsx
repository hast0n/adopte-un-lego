import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Divider } from "react-native-elements";
import { SetsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import Input from "../components/Input";
import Set from "../services/legoset.model";
import LegoTheme from "../services/legotheme.model";

interface SetsScreenState {
  setList: Array<Set>;
  themeList: Array<LegoTheme>; // not supposed to be updated but might be more efficient to store it there ¯\_(ツ)_/¯
}

export default class SetsScreen extends Component<
  SetsScreenProps,
  SetsScreenState
> {
  state: SetsScreenState = {
    setList: [],
    themeList: [],
  };

  legoThemes: Array<LegoTheme> = [];

  getThemes = () => {
    legodbapi.getThemes().then((themes) => {
      this.setState({ themeList: themes });
    });
  };

  componentDidMount() {
    this.getThemes();
  }

  onSearchSubmit = (text: string) => {
    legodbapi.searchLegoSetByTerm(text).then((result) => {
      this.setState({ setList: result });
    });
  };

  themeRenderItem = ({ item }: { item: LegoTheme }) => {
    //Search by theme page
    //return <SetsItem sets={item} navigation={this.props.navigation} />;

    return (
      <View style={styles.themeItem}>
        <Image
          style={styles.themePicture}
          source={{ uri: legodbapi.getThemePictureUrlById(item.ID) }}
        ></Image>
      </View>
    );
  };

  render() {
    if (this.state.setList.length < 1) {
      return (
        <View style={styles.container}>
          <Text style={styles.hint}>
            Search a Lego set by name or browse the collection by theme
          </Text>

          <Divider style={styles.divider} />

          <Input
            onSubmitEditing={this.onSearchSubmit}
            placeholder="Search a Lego set"
          />

          <FlatList
            style={styles.themeList}
            renderItem={this.themeRenderItem}
            data={this.legoThemes}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>
          Search a Lego set by name or browse the collection by theme
        </Text>

        <Divider style={styles.divider} />

        <Input
          onSubmitEditing={this.onSearchSubmit}
          placeholder="Search a Lego set"
        />

        <Text>Results for "{}"</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  hint: {
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.2,
    width: 370,
  },
  themeList: {},
  themeItem: {},
  themePicture: {
    height: 10,
    width: 10,
  },
});
