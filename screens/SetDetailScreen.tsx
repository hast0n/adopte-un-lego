import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Linking, Modal } from "react-native";
import { Divider } from "react-native-elements";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoSet from "../services/legoset.model";
import { SetDetailScreenProps } from "../navigation/app-stacks";
import LegoPart from "../services/legopart.model";
import Toast from "react-native-simple-toast";

interface SetDetailScreenState {
  set: LegoSet;
  theme: LegoTheme;
  parts: LegoPart[];
  modalVisible: boolean;
  selectedPartID: string;
}

export default class SetDetailScreen extends Component<
  SetDetailScreenProps,
  SetDetailScreenState
> {
  state: SetDetailScreenState = {
    set: {
      ID: undefined,
      ImgUrl: undefined,
      LastModified: undefined,
      Name: undefined,
      NumParts: undefined,
      SetUrl: undefined,
      ThemeID: undefined,
      Year: undefined,
    },
    theme: {
      ID: undefined,
      Name: undefined,
      ParentID: undefined,
    },
    parts: [],
    modalVisible: false,
    selectedPartID: undefined,
  };

  componentDidMount() {
    legodbapi.getLegoSetById(this.props.route.params.id).then((legoSet) => {
      this.setState({ set: legoSet });

      legodbapi.getThemeByID(legoSet.ThemeID).then((legoTheme) => {
        this.setState({ theme: legoTheme });
      });

      legodbapi
        .getPartsBySetID(legoSet.ID, legoSet.NumParts)
        .then((legoParts) => {
          this.setState({ parts: legoParts });
        });
    });
  }

  onPartPress = (name: string) => {
    Toast.show(name);
  };

  // onOpenModal = (id: string) => {
  //   this.setState({
  //     modalVisible: true,
  //     selectedPartID: id,
  //   });
  // };

  // onCloseModal = () => {
  //   this.setState({ modalVisible: false });
  // };

  render() {
    const set = this.state.set;
    const theme = this.state.theme;
    const parts = this.state.parts;
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.picture}
          source={{ uri: set.ImgUrl }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>
        <View style={styles.infos}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 0.6 }}>
              <Text style={styles.title}>{set.Name}</Text>
              <Text style={styles.id}>ID: {set.ID}</Text>
            </View>
            <Image
              style={styles.logo}
              source={{
                uri: legodbapi.getThemeLogoUrlById(theme.ID),
              }}
              resizeMethod={"scale"}
              resizeMode={"contain"}
            ></Image>
          </View>

          <Text style={styles.infoHint}>Information about this set</Text>
          <Divider style={styles.divider}></Divider>

          <View style={{ height: 90, justifyContent: "space-between" }}>
            <Text style={styles.key}>
              Nuber of parts in this set:
              <Text style={styles.value}> {set.NumParts}</Text>
            </Text>
            <Text style={styles.key}>
              Release year:
              <Text style={styles.value}> {set.Year}</Text>
            </Text>
            <Text style={styles.key}>
              Series:
              <Text style={styles.value}> {theme.Name}</Text>
            </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(set.SetUrl)}
            >
              See more info on Rebrickable...
            </Text>
          </View>

          <Text style={styles.infoHint}>Parts included in this set</Text>
          <Divider style={styles.divider}></Divider>

          <View style={styles.partStack}>
            {[...this.state.parts].map((part) => {
              return this.renderPart(part);
            })}
            {/* <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={this.onCloseModal}
            >
              {this.renderModal()}
            </Modal> */}
          </View>
        </View>
      </ScrollView>
    );
  }

  renderPart = (part: LegoPart) => {
    return (
      <TouchableOpacity
        key={part.ID + Math.random()}
        onPress={() => this.onPartPress(part.Name)}
      >
        <Image
          source={{ uri: part.ImgUrl }}
          style={styles.partImg}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>

        <View style={{ flexDirection: "row", width: 70 }}>
          <Text style={styles.partQuantity}>x{part.quantity}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ marginRight: 10 }}
          >
            {part.Name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Part details modal: disabled - replaced by toast message

  // renderModal = () => {
  //   const id = this.state.selectedPartID;
  //   if (id !== undefined) {
  //     const part = this.state.parts.find((x) => x.ID == id);
  //     return (
  //       <View style={modalStyles.container}>
  //         <View style={modalStyles.modal}>
  //           <Text style={modalStyles.title}>{part.Name}</Text>
  //           <Text style={modalStyles.title}>{part.ID}</Text>
  //         </View>
  //       </View>
  //     );
  //   }
  // };
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "white" },
  picture: {
    flex: 1,
    minHeight: 300,
    width: "100%",
    alignSelf: "stretch",
  },
  infos: {
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  logo: {
    flex: 0.5,
    height: "100%",
    alignSelf: "center",
  },
  id: {
    fontStyle: "italic",
    color: "gray",
  },
  link: {
    color: "blue",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  key: {
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  infoHint: {
    marginTop: 20,
    color: "tomato",
    fontSize: 21,
    marginBottom: 0,
    fontWeight: "bold",
  },
  partStack: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  partImg: {
    height: 80,
    width: 80,
  },
  partQuantity: {
    flex: 0,
    paddingHorizontal: 6,
    borderRadius: 100,
    backgroundColor: "lightgray",
    marginBottom: 15,
  },
});

// const modalStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignSelf: "stretch",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modal: {
//     height: "60%",
//     width: "70%",
//     backgroundColor: "white",
//     shadowColor: "black",
//     elevation: 100,
//     borderRadius: 20,
//   },
//   title: {},
// });
