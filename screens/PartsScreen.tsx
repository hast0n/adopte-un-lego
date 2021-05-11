import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { PartsScreenProps } from "../navigation/app-stacks";
import PartCategory from "../services/partcategory.model";
import legodbapi from "../services/legodbapi.service";
import PartCategoryFlatlist from "../components/PartCategoryFlatlist";
import { Divider } from "react-native-elements";

interface PartsScreenState {
  listCategories: Array<PartCategory>;
  loading: boolean;
}

export default class PartsScreen extends Component<
  PartsScreenProps,
  PartsScreenState
> {
  state: PartsScreenState = {
    listCategories: [],
    loading: true,
  };

  componentDidMount() {
    legodbapi.getPartsCategories().then((categories) => {
      this.setState({ listCategories: categories, loading: false });
    });
  }

  onPressCategory = (item: PartCategory) => {
    this.props.navigation.push("CategoryParts", {
      id: item.ID,
      name: item.Name,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View>
          {this.renderHeader()}
          <ActivityIndicator
            color="tomato"
            style={{ alignSelf: "center", marginTop: 20 }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <PartCategoryFlatlist
          listCategories={this.state.listCategories}
          onPressCategory={this.onPressCategory}
        />
      </View>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.hint}>Browse Lego part by cateogries below</Text>
        <Divider style={styles.divider} />
      </View>
    );
  };
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
  header: {
    marginTop: 20,
    alignItems: "center",
  },
});
