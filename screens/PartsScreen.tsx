import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { PartsScreenProps } from "../navigation/app-stacks";
import PartCategory from "../services/partcategory.model";
import legodbapi from "../services/legodbapi.service";
import PartCategoryFlatlist from "../components/PartCategoryFlatlist";
import { Divider } from "react-native-elements";

interface PartsScreenState {
  listCategories: Array<PartCategory>;
}

export default class PartsScreen extends Component<
  PartsScreenProps,
  PartsScreenState
> {
  state: PartsScreenState = {
    listCategories: [],
  };

  componentDidMount() {
    legodbapi.getPartsCategories().then((categories) => {
      this.setState({ listCategories: categories });
    });
  }

  onPressCategory = (item: PartCategory) => {
    this.props.navigation.push("CategoryParts", {
      id: item.ID,
      name: item.Name,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>Choose a part category</Text>
        <Divider style={styles.divider} />
        <PartCategoryFlatlist
          listCategories={this.state.listCategories}
          onPressCategory={this.onPressCategory}
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
    paddingTop: 20,
  },
  hint: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 18,
    color: "gray",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
});
