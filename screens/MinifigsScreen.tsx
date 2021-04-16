import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MinifigsScreenProps } from "../navigation/app-stacks";

export default class MinifigsScreen extends Component<MinifigsScreenProps, {}> {
  render() {
    //const navigation: StackNavigationProp<RootStackParamList, "Cocktail">
    //const{navigation} = this.props;
    return (
      <View>
        <Text>Minifigssssss</Text>
      </View>
    );
  }
}
