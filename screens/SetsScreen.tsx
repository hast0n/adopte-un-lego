import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Divider } from "react-native-elements";
import { SetsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import LegoSet from "../services/legoset.model";
import ThemeFlatlist from "../components/ThemeFlatlist";
import SetsScreenHeader from "../components/SetsScreenHeader";
import SetFlatlist from "../components/SetFlatlist";
import NoResults from "../components/NoResults";

interface SetsScreenState {
  setList: Array<LegoSet>;
  themeList: Array<LegoTheme>; // not supposed to be updated but might be more efficient to store it there ¯\_(ツ)_/¯
  currentSearch: string;
  pageNumber: number;
  loading: boolean;
}

export default class SetsScreen extends Component<
  SetsScreenProps,
  SetsScreenState
> {
  state: SetsScreenState = {
    setList: [],
    themeList: [],
    currentSearch: "",
    pageNumber: 1,
    loading: true,
  };

  allowedThemes: number[] = [
    602,
    576,
    693,
    435,
    577,
    155,
    676,
    494,
    246,
    252,
    610,
    621,
    535,
    22,
    608,
    579,
    504,
    601,
    158,
    695,
    50,
    1,
    690,
    696,
  ];

  getThemes = () => {
    return legodbapi.getAllThemes();
  };

  componentDidMount() {
    // Get themes from API:

    // Method 1: Generates a lot of requests which might block the access for a certain amount of time...
    // this.allowedThemes.forEach((id) => {
    //   legodbapi.getThemeByID(id).then((theme) => {
    //     this.setState({ themeList: [theme, ...this.state.themeList] });
    //   });
    // });

    // Method 2: Is really not effective as we retrive the entire theme database and then filter it...
    legodbapi.getAllThemes().then((themes) => {
      this.setState({
        themeList: themes.filter((theme) =>
          this.allowedThemes.includes(theme.ID)
        ),
      });
    });
  }

  loadNextPage = () => {
    this.state.pageNumber++;

    const search = this.state.currentSearch;
    const page = this.state.pageNumber;

    legodbapi.searchLegoSetByTerm(search, page, 25).then((sets) => {
      if (sets.length > 0) {
        this.setState({
          setList: [...this.state.setList, ...sets],
        });
      }
    });
  };

  onSearchSubmit = (text: string) => {
    legodbapi.searchLegoSetByTerm(text).then((result) => {
      this.setState({ setList: result, currentSearch: text });
    });
  };

  bringBackThemes = () => {
    this.setState({ setList: [], currentSearch: "" });
  };

  legoSetPress = (item: LegoSet) => {
    this.props.navigation.push("SetDetails", { id: item.ID });
  };

  legoThemePress = (item: LegoTheme) => {
    this.props.navigation.push("ThemeSearch", { id: item.ID });
  };

  render() {
    const setList = this.state.setList;
    const search = this.state.currentSearch;

    if (this.state.loading) {
      return (
        <View>
          {/* <SetsScreenHeader
            onSearchSubmit={(text: string) => void}
            bringBackThemes={() => void}
          /> */}
          <ActivityIndicator color="tomato" />
        </View>
      );
    } else if (setList.length < 1 && search == "") {
      return (
        <View style={styles.container}>
          <SetsScreenHeader
            onSearchSubmit={this.onSearchSubmit}
            bringBackThemes={this.bringBackThemes}
          />
          <Text style={styles.title}>Themes</Text>
          <ThemeFlatlist
            itemList={this.state.themeList}
            legoThemePress={this.legoThemePress}
          />
        </View>
      );
    } else if (setList.length > 1) {
      return (
        <View style={styles.container}>
          <SetsScreenHeader
            onSearchSubmit={this.onSearchSubmit}
            bringBackThemes={this.bringBackThemes}
          />
          <Text style={styles.title}>
            Search results for "{this.state.currentSearch}"
          </Text>
          <SetFlatlist
            itemList={this.state.setList}
            legoSetPress={this.legoSetPress}
            onEndReached={this.loadNextPage}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SetsScreenHeader
            onSearchSubmit={this.onSearchSubmit}
            bringBackThemes={this.bringBackThemes}
          />
          <Text style={styles.title}>
            Search results for "{this.state.currentSearch}"
          </Text>

          <NoResults />
        </View>
      );
    }
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
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  header: {
    alignItems: "center",
  },
  title: {
    alignSelf: "flex-start",
    color: "tomato",
    fontSize: 16,
    marginHorizontal: 22,
    marginBottom: 10,
  },
});
