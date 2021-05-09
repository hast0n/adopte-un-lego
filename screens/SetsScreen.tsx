import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Divider } from "react-native-elements";
import { SetsScreenProps } from "../navigation/app-stacks";
import legodbapi from "../services/legodbapi.service";
import Input from "../components/Input";
import Set from "../services/legoset.model";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoSet from "../services/legoset.model";

interface SetsScreenState {
  setList: Array<Set>;
  themeList: Array<LegoTheme>; // not supposed to be updated but might be more efficient to store it there ¯\_(ツ)_/¯
  currentSearch: string;
}

export default class SetsScreen extends Component<
  SetsScreenProps,
  SetsScreenState
> {
  state: SetsScreenState = {
    setList: [],
    themeList: [],
    currentSearch: "",
  };

  allowedThemes: number[] = [
    602,
    576,
    693,
    435,
    577,
    155,
    676,
    494,
    246,
    252,
    610,
    621,
    535,
    22,
    608,
    579,
    504,
    601,
    158,
    695,
    50,
    1,
    690,
    696,
  ];

  getThemes = () => {
    return legodbapi.getAllThemes();
  };

  componentDidMount() {
    // Get themes from API:

    // Method 1: Generates a lot of requests which might block the access for a certain amount of time...
    // this.allowedThemes.forEach((id) => {
    //   legodbapi.getThemeByID(id).then((theme) => {
    //     this.setState({ themeList: [theme, ...this.state.themeList] });
    //   });
    // });

    // Method 2: Is really not effective as we retrive the entire theme database and then filter it...
    legodbapi.getAllThemes().then((themes) => {
      this.setState({
        themeList: themes.filter((theme) =>
          this.allowedThemes.includes(theme.ID)
        ),
      });
    });
  }

  onSearchSubmit = (text: string) => {
    legodbapi.searchLegoSetByTerm(text).then((result) => {
      this.setState({ setList: result, currentSearch: text });
    });
  };

  themeRenderItem = ({ item }: { item: LegoTheme }) => {
    return (
      <View style={themeStyles.item}>
        <TouchableOpacity style={{ height: "100%", width: "100%" }}>
          <Image
            style={themeStyles.picture}
            source={{ uri: legodbapi.getThemePictureUrlById(item.ID) }}
          ></Image>
          <Image
            style={themeStyles.logo}
            source={{ uri: legodbapi.getThemeLogoUrlById(item.ID) }}
            resizeMethod={"scale"}
            resizeMode={"contain"}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  };

  setRenderItem = ({ item }: { item: LegoSet }) => {
    return (
      <View style={setStyles.item}>
        <TouchableOpacity
          style={{ height: "100%", width: "100%" }}
          onPress={() => this.legoSetPress(item)}
        >
          <Image
            style={setStyles.picture}
            source={{ uri: item.ImgUrl }}
            resizeMethod={"scale"}
            resizeMode={"contain"}
          ></Image>
          <View style={setStyles.info}>
            <Text style={setStyles.name}>{item.Name}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={setStyles.year}>{item.Year}</Text>
              <Text style={setStyles.id}>{item.ID}</Text>
            </View>
            <Text style={setStyles.nbParts}>({item.NumParts} parts)</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  bringBackThemes = () => {
    this.setState({ setList: [] });
  };

  legoSetPress = (item: LegoSet) => {
    this.props.navigation.push("SetDetails", { id: item.ID });
  };

  legoThemePress = () => {};

  header = (
    <View style={screenStyles.header}>
      <Text style={screenStyles.hint}>
        Search a Lego set by name or browse the collection by theme
      </Text>

      <Input
        onSubmitEditing={this.onSearchSubmit}
        placeholder="Search a Lego set"
        clearAfterSubmit={false}
        showDismissButton={true}
        onDismissPress={this.bringBackThemes}
      />

      <Divider style={screenStyles.divider} />
    </View>
  );

  render() {
    if (this.state.setList.length < 1) {
      return (
        <View style={screenStyles.container}>
          {this.header}

          <Text style={screenStyles.title}>Themes</Text>

          <FlatList
            columnWrapperStyle={themeStyles.columnWrapper}
            numColumns={3}
            key={3}
            data={this.state.themeList}
            style={themeStyles.list}
            renderItem={this.themeRenderItem}
            keyExtractor={(item) => item.ID.toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={screenStyles.container}>
          {this.header}

          <Text style={screenStyles.title}>
            Search results for "{this.state.currentSearch}"
          </Text>

          <FlatList
            columnWrapperStyle={setStyles.columnWrapper}
            numColumns={2}
            key={2}
            data={this.state.setList}
            style={setStyles.list}
            renderItem={this.setRenderItem}
            keyExtractor={(item) => item.ID.toString()}
          />
        </View>
      );
    }
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
  hint: {
    marginHorizontal: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
    color: "gray",
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

const themeStyles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: "stretch",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginVertical: 10,
  },
  item: {
    overflow: "hidden",
    width: 115,
    height: 130,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  logo: {
    flex: 1,
    width: "90%",
    height: undefined,
    alignSelf: "center",
    marginBottom: 3,
  },
  picture: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
  divider: {
    backgroundColor: "gray",
    height: 0.3,
    width: 30,
    alignSelf: "center",
  },
});

const setStyles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: "stretch",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 21,
    marginVertical: 10,
  },
  item: {
    overflow: "hidden",
    flex: 0.47,
    height: 250,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  picture: {
    flex: 1,
    height: undefined,
    width: "100%",
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    marginVertical: 2,
  },
  id: {
    fontStyle: "italic",
    color: "gray",
  },
  nbParts: {
    fontStyle: "italic",
    color: "gray",
  },
  year: {
    fontStyle: "italic",
    color: "gray",
  },
  info: { margin: 7 },
});
