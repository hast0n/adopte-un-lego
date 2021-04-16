import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { SetsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import { FlatList } from "react-native-gesture-handler";
import RechercheInput from "../components/RechercheInput";
import Set from "../services/legoset.model";

interface SetsScreenState {
  SetList: Array<Set>;
}

export default class SetsScreen extends Component<{}, SetsScreenState> {
  state: SetsScreenState = {
    SetList: [],
  };
  // onTextSubmitLocale = (text: string) => {
  //   setsdbapiService.searchSetsByName(text).then((result) => {
  //     this.setState({ SetsList: result });
  //   });
  // };
  // renderItemLocale = ({ item }: { item: Sets }) => {
  //   //return <SetsItem sets={item} navigation={this.props.navigation} />;
  // };
  render() {
    return (
      <View style={styles.container}>
        <RechercheInput />
        <Text>Setssssssss</Text>
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
    paddingTop: 40,
  },
});
