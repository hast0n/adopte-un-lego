import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { PartsScreenProps } from "../navigation/app-stacks";
import PartCategory from "../services/partcategory.model";
import legodbapi from "../services/legodbapi.service";
import PartCategoryItem from "../components/PartCategoryItem";

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

  render() {
    //const { navigation } = this.props;

    return (
      <View>
        <Text>Partsssss</Text>
        <FlatList
          data={this.state.listCategories}
          renderItem={({ item }: { item: PartCategory }) => (
            <PartCategoryItem category={item} />
          )}
          keyExtractor={(item) => item.ID.toString()}
        />
      </View>
    );
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
