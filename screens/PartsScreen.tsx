import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { PartsScreenProps } from "../navigation/app-stacks";
import PartCategory from "../services/partcategory.model";
import legodbapi from "../services/legodbapi.service";
import PartCategoryFlatlist from "../components/PartCategoryFlatlist";

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
    this.props.navigation.push("CategoryParts", { id: item.ID });
  };

  render() {
    return (
      <View style={styles.container}>
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
  },
});
