import React, { Component } from "react";
import { Text, View } from "react-native";
import { ThemeSearchScreenProps } from "../navigation/app-stacks";
import LegoTheme from "../services/legotheme.model";
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
    });
    legodbapi
      .searchLegoSetByThemeId(this.props.route.params.id)
      .then((sets) => {
        this.setState({ setList: sets });
      });
  }

  render() {
    //const { navigation } = this.props.navigation;

    return (
      <View>
        <Text>{this.state.theme.Name}</Text>
        {/* <Text>{this.state.setList[0].Name}</Text> */}
        <SetFlatlist itemList={this.state.setList} legoSetPress={() => null} />
      </View>
    );
  }
}
