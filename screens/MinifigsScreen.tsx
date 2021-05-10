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
  pageNumber: number;
  currentSearch: string;
}

export default class MinifigsScreen extends Component<
  MinifigsScreenProps,
  MinifigsScreenState
> {
  state: MinifigsScreenState = {
    minifigList: [],
    currentSearch: "",
    pageNumber: 1,
  };

  resetMinifigList = () => {
    legodbapi.getAllLegoMinifigs().then((minifigs) => {
      this.setState({
        minifigList: minifigs,
      });
    });
  };

  componentDidMount() {
    this.resetMinifigList();
  }

  onSearchSubmit = (text: string) => {
    legodbapi.searchLegoMinifigByTerm(text).then((result) => {
      this.setState({ minifigList: result, currentSearch: text });
    });
  };

  // onLeftClick = () => {
  //   if (this.state.pageNumber != 1) {
  //     this.state.pageNumber -= 1;
  //     legodbapi
  //       .getAllLegoMinifigs(100, this.state.pageNumber)
  //       .then((minifigs) => {
  //         this.setState({
  //           totalList: minifigs,
  //         });
  //       });
  //   }
  // };
  // onRightClick = () => {
  //   if (this.state.pageNumber != 0) {
  //     this.state.pageNumber += 1;
  //     legodbapi.getAllLegoMinifigs(this.state.pageNumber).then((minifigs) => {
  //       this.setState({
  //         totalList: minifigs,
  //       });
  //     });
  //   }
  // };

  loadNextPage = () => {
    this.state.pageNumber++;

    const search = this.state.currentSearch;
    const page = this.state.pageNumber;

    if (this.state.currentSearch != "") {
      legodbapi.searchLegoMinifigByTerm(search, page, 25).then((minifigs) => {
        if (minifigs.length > 0) {
          this.setState({
            minifigList: [...this.state.minifigList, ...minifigs],
          });
        }
      });
    } else {
      legodbapi.getAllLegoMinifigs(page, 25).then((minifigs) => {
        if (minifigs.length > 0) {
          this.setState({
            minifigList: [...this.state.minifigList, ...minifigs],
          });
        }
      });
    }
  };

  onSearchReset = () => {
    this.resetMinifigList();
    this.setState({
      currentSearch: "",
      pageNumber: 1,
    });
  };

  legoMinifigPress = (item: LegoMinifig) => {
    this.props.navigation.push("MinifigDetails", { id: item.ID });
  };

  render() {
    const search = this.state.currentSearch;

    if (search.length < 1) {
      return (
        <View style={screenStyles.container}>
          <MinifigsScreenHeader
            onSearchSubmit={this.onSearchSubmit}
            bringBackThemes={this.onSearchReset}
          />
          <Text style={screenStyles.title}>Minifigs</Text>
          {/* <MinifigsScreenFooter
            pageNumber={this.state.pageNumber}
            onClickLeft={this.onLeftClick}
            onClickRight={this.onRightClick}
          /> */}
          <MinifigFlatlist
            itemList={this.state.minifigList}
            legoMinifigPress={this.legoMinifigPress}
            onEndReached={this.loadNextPage}
          />
        </View>
      );
    } else {
      return (
        <View style={screenStyles.container}>
          <MinifigsScreenHeader
            onSearchSubmit={this.onSearchSubmit}
            bringBackThemes={this.onSearchReset}
          />
          <Text style={screenStyles.title}>
            Search results for "{this.state.currentSearch}"
          </Text>
          <MinifigFlatlist
            itemList={this.state.minifigList}
            legoMinifigPress={this.legoMinifigPress}
            onEndReached={this.loadNextPage}
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
