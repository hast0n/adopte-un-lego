import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import Input from "../navigation/components/input";
import { SetsScreenProps } from "../navigation/app-stacks";
import setsdbapiService from "./services/cocktaildbapi.service";
import { FlatList } from "react-native-gesture-handler";
import Sets from "../screens/services/cocktail.model";
import SetsList from "../navigation/components/CocktailList";
import SetsItem from "../navigation/components/CocktailItem";

interface SetsScreenState {
  SetsList: Array<Sets>;
}

export default class SetsScreen extends Component<SetsScreenProps> {
  // state: SetsScreenState = {
  //   SetsList: [],
  // };
  // onTextSubmitLocale = (text: string) => {
  //   setsdbapiService.searchSetsByName(text).then((result) => {
  //     this.setState({ SetsList: result });
  //   });
  // };
  renderItemLocale = ({ item }: { item: Sets }) => {
    //return <SetsItem sets={item} navigation={this.props.navigation} />;
  };
  render() {
    return (
      
    );
  }
}
