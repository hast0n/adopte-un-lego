import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image, Linking } from "react-native";
import { Divider } from "react-native-elements";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoMinifig from "../services/legominifig.model";
import LegoPart from "../services/legopart.model";
import { MinifigDetailScreenProps } from "../navigation/app-stacks";
import PartTile from "../components/PartTile";

interface MinifigDetailScreenState {
  minifig: LegoMinifig;
  theme: LegoTheme;
  parts: LegoPart[];
  modalVisible: boolean;
  selectedPartID: string;
}

export default class MinifigDetailScreen extends Component<
  MinifigDetailScreenProps,
  MinifigDetailScreenState
> {
  state: MinifigDetailScreenState = {
    minifig: {
      ID: undefined,
      ImgUrl: undefined,
      LastModified: undefined,
      Name: undefined,
      NumParts: undefined,
      FigUrl: undefined,
      quantity: undefined,
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
    legodbapi
      .getLegoMinifigById(this.props.route.params.id)
      .then((legoMinifig) => {
        this.setState({ minifig: legoMinifig });

        legodbapi.getPartsByMinifigId(legoMinifig.ID).then((legoParts) => {
          this.setState({ parts: legoParts });
        });
      });
  }

  onPartPress = (name: string) => {
    toast.show(name, { type: "warning" });
  };

  render() {
    const minifig = this.state.minifig;
    const parts = this.state.parts;
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.picture}
          source={{ uri: minifig.ImgUrl }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>
        <View style={styles.infos}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.title}>{minifig.Name}</Text>
              <Text style={styles.id}>ID: {minifig.ID}</Text>
            </View>
            <Text style={styles.infoHint}>Information about this Minifig</Text>
            <Divider style={styles.divider}></Divider>
            <View style={{ height: 50, justifyContent: "space-between" }}>
              <Text style={styles.key}>
                Number of parts in this set:
                <Text style={styles.value}> {minifig.NumParts}</Text>
              </Text>
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(minifig.FigUrl)}
              >
                See more info on Rebrickable...
              </Text>
              {/* <Text style={styles.key}>Date de dernière modification :</Text>
              <Text style={styles.value}> {minifig.LastModified}</Text> */}
            </View>
          </View>

          <Text style={styles.infoHint}>Parts included in this set</Text>
          <Divider style={styles.divider}></Divider>

          <View style={styles.partStack}>
            {[...this.state.parts].map((part, i) => {
              //return this.renderPart(part);
              return (
                <PartTile
                  part={part}
                  onPartPress={this.onPartPress}
                  key={part.ID + i}
                />
              );
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

  //   renderPart = (part: LegoPart) => {
  //     return (
  //       <TouchableOpacity
  //         key={part.ID + Math.random()}
  //         onPress={() => this.onPartPress(part.Name)}
  //       >
  //         <Image
  //           source={{ uri: part.ImgUrl }}
  //           style={styles.partImg}
  //           resizeMethod={"scale"}
  //           resizeMode={"contain"}
  //         ></Image>

  //         <View style={{ flexDirection: "row", width: 70 }}>
  //           <Text style={styles.partQuantity}>x{part.quantity}</Text>
  //           <Text
  //             numberOfLines={1}
  //             ellipsizeMode="tail"
  //             style={{ marginRight: 10 }}
  //           >
  //             {part.Name}
  //           </Text>
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   };
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "white" },
  picture: {
    flex: 1,
    minHeight: 300,
    width: "100%",
    alignSelf: "stretch",
  },
  infos: { margin: 10 },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "gray",
    height: 0.3,
    width: 370,
  },
  key: {
    fontSize: 15,
  },
  link: {
    color: "blue",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  id: {
    fontStyle: "italic",
    color: "gray",
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
});
