import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ThemeSearchScreenProps } from "../navigation/app-stacks";
import LegoTheme from "../services/legotheme.model";
import LegoSet from "../services/legoset.model";
import Set from "../services/legoset.model";
import legodbapi from "../services/legodbapi.service";
import SetFlatlist from "../components/SetFlatlist";
import NoResults from "../components/NoResults";
import ThemeSearchScreenHeader from "../components/ThemeSearchScreenHeader";

interface ThemeSearchScreenState {
  theme: LegoTheme;
  setList: Array<Set>;
  pageNumber: number;
  currentSearch: string;
  loading: boolean;
}

export default class ThemeSearchScreen extends Component<
  ThemeSearchScreenProps,
  ThemeSearchScreenState
> {
  state: ThemeSearchScreenState = {
    theme: {
      ID: undefined,
      Name: undefined,
      ParentID: undefined,
    },
    setList: [],
    pageNumber: 1,
    currentSearch: "",
    loading: true,
  };

  componentDidMount() {
    legodbapi.getThemeByID(this.props.route.params.id).then((legoTheme) => {
      this.setState({ theme: legoTheme });
      this.resetSetList();
    });
  }

  legoSetPress = (item: LegoSet) => {
    this.props.navigation.push("SetDetails", { id: item.ID });
  };

  loadNextPage = () => {
    this.state.pageNumber++;

    const id = this.state.theme.ID;
    const page = this.state.pageNumber;
    const search = this.state.currentSearch;

    if (this.state.currentSearch == "") {
      legodbapi.searchLegoSetByThemeId(id, page, 25).then((sets) => {
        if (sets.length > 0) {
          this.setState({
            setList: [...this.state.setList, ...sets],
          });
        }
      });
    } else {
      legodbapi
        .searchLegoSetByThemeIdAndTerm(id, search, page, 25)
        .then((sets) => {
          if (sets.length > 0) {
            this.setState({
              setList: [...this.state.setList, ...sets],
            });
          }
        });
    }
  };

  onSearchReset = () => {
    this.resetSetList();
    this.setState({
      currentSearch: "",
      pageNumber: 1,
    });
  };

  onSearchSubmit = (text: string) => {
    this.setState({ loading: true });
    legodbapi
      .searchLegoSetByThemeIdAndTerm(this.state.theme.ID, text)
      .then((result) => {
        this.setState({ setList: result, currentSearch: text, loading: false });
      });
  };

  resetSetList = () => {
    legodbapi.searchLegoSetByThemeId(this.state.theme.ID).then((sets) => {
      this.setState({ setList: sets, loading: false });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ThemeSearchScreenHeader
          themeName={this.state.theme.Name}
          onSearchReset={this.onSearchReset}
          onSearchSubmit={this.onSearchSubmit}
        />
        {this.state.loading ? (
          <ActivityIndicator
            color="tomato"
            style={{ alignSelf: "center", marginTop: 10 }}
          />
        ) : (
          this.renderSets()
        )}
      </View>
    );
  }

  renderSets = () => {
    if (this.state.setList.length > 0) {
      return (
        <SetFlatlist
          itemList={this.state.setList}
          legoSetPress={this.legoSetPress}
          onEndReached={this.loadNextPage}
        />
      );
    } else {
      return <NoResults />;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
});
