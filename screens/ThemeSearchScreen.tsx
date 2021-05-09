import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ThemeSearchScreenProps } from "../navigation/app-stacks";
import LegoTheme from "../services/legotheme.model";
import LegoSet from "../services/legoset.model";
import Set from "../services/legoset.model";
import legodbapi from "../services/legodbapi.service";
import SetFlatlist from "../components/SetFlatlist";

interface ThemeSearchScreenState {
  theme: LegoTheme;
  setList: Array<Set>;
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
  };

  componentDidMount() {
    legodbapi.getThemeByID(this.props.route.params.id).then((legoTheme) => {
      this.setState({ theme: legoTheme });

      legodbapi.searchLegoSetByThemeId(legoTheme.ID).then((sets) => {
        this.setState({ setList: sets });
      });
    });
  }

  legoSetPress = (item: LegoSet) => {
    this.props.navigation.push("SetDetails", { id: item.ID });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.theme.Name}</Text>
        <SetFlatlist
          itemList={this.state.setList}
          legoSetPress={this.legoSetPress}
        />
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
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  title: {
    alignSelf: "flex-start",
    color: "tomato",
    fontSize: 16,
    marginHorizontal: 22,
    marginBottom: 10,
  },
});
