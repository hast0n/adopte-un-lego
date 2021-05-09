import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Divider } from "react-native-elements";
import { MinifigsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import LegoMinifig from "../services/legominifig.model";
import ThemeFlatlist from "../components/ThemeFlatlist";
import MinifigsScreenHeader from "../components/MinifigsScreenHeader";
import MinifigsScreenFooter from "../components/MinifigScreenFooter";
import MinifigFlatlist from "../components/MinifigFlatlist";

interface MinifigsScreenState {
  minifigList: Array<LegoMinifig>;
  totalList: Array<LegoMinifig>; // not supposed to be updated but might be more efficient to store it there ¯\_(ツ)_/¯
  pageNumber: number;
  currentSearch: string;
}

export default class MinifigsScreen extends Component<
  MinifigsScreenProps,
  MinifigsScreenState
> {
  state: MinifigsScreenState = {
    minifigList: [],
    totalList: [],
    currentSearch: "",
    pageNumber: 1,
  };

  getMinifigs = () => {
    return legodbapi.getAllLegoMinifigs();
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
    legodbapi
      .getAllLegoMinifigs(100, this.state.pageNumber)
      .then((minifigs) => {
        this.setState({
          totalList: minifigs,
        });
      });
  }

  onSearchSubmit = (text: string) => {
    legodbapi.searchLegoMinifigByTerm(text).then((result) => {
      this.setState({ minifigList: result, currentSearch: text });
    });
  };

  onLeftClick = () => {
    if (this.state.pageNumber != 1) {
      this.state.pageNumber -= 1;
      legodbapi
        .getAllLegoMinifigs(100, this.state.pageNumber)
        .then((minifigs) => {
          this.setState({
            totalList: minifigs,
          });
        });
    }
  };
  onRightClick = () => {
    if (this.state.pageNumber != 0) {
      this.state.pageNumber += 1;
      legodbapi
        .getAllLegoMinifigs(100, this.state.pageNumber)
        .then((minifigs) => {
          this.setState({
            totalList: minifigs,
          });
        });
    }
  };

  bringBackThemes = () => {
    this.setState({ minifigList: [] });
  };

  legoMinifigPress = (item: LegoMinifig) => {
    this.props.navigation.push("MinifigDetails", { id: item.ID });
  };

  render() {
    if (this.state.minifigList.length < 1) {
      return (
        <View style={screenStyles.container}>
          <MinifigsScreenHeader
            onSearchSubmit={this.onSearchSubmit}
            bringBackThemes={this.bringBackThemes}
          />
          <Text style={screenStyles.title}>Minifigs</Text>
          <MinifigsScreenFooter
            pageNumber={this.state.pageNumber}
            onClickLeft={this.onLeftClick}
            onClickRight={this.onRightClick}
          />
          <MinifigFlatlist
            itemList={this.state.totalList}
            legoMinifigPress={this.legoMinifigPress}
          />
          <MinifigsScreenFooter
            pageNumber={this.state.pageNumber}
            onClickLeft={this.onLeftClick}
            onClickRight={this.onRightClick}
          />
        </View>
      );
    } else {
      return (
        <View style={screenStyles.container}>
          <MinifigsScreenHeader
            onSearchSubmit={this.onSearchSubmit}
            bringBackThemes={this.bringBackThemes}
          />
          <Text style={screenStyles.title}>
            Search results for "{this.state.currentSearch}"
          </Text>
          <MinifigFlatlist
            itemList={this.state.minifigList}
            legoMinifigPress={this.legoMinifigPress}
          />
        </View>
      );
    }
  }
}

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  hint: {
    marginHorizontal: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
    color: "gray",
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
