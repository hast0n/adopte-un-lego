import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Linking, Modal } from "react-native";
import { Divider } from "react-native-elements";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LegoSet from "../services/legoset.model";
import { SetDetailScreenProps } from "../navigation/app-stacks";
import LegoPart from "../services/legopart.model";
import Toast from "react-native-fast-toast";
import LegoMinifig from "../services/legominifig.model";
import MinifigTile from "../components/MinifigTile";

interface SetDetailScreenState {
  set: LegoSet;
  theme: LegoTheme;
  parts: LegoPart[];
  minifigs: LegoMinifig[];
  // modalVisible: boolean;
  // selectedPartID: string;
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
    minifigs: [],
    // modalVisible: false,
    // selectedPartID: undefined,
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

    legodbapi
      .getMinifigsIdsBySetId(this.props.route.params.id)
      .then((figsInfo) => {
        figsInfo.forEach((f) => {
          legodbapi.getLegoMinifigById(f.set_num).then((minifig) => {
            minifig.quantity = f.quantity;
            this.setState({ minifigs: [...this.state.minifigs, minifig] });
          });
        });
      });
  }

  showToastMessage = (text: string) => {
    toast.show(text, { type: "warning" });
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
        <View style={[styles.sectionContent, { marginTop: 15 }]}>
          <Image
            style={styles.picture}
            source={{ uri: set.ImgUrl }}
            resizeMethod={"scale"}
            resizeMode={"contain"}
          ></Image>
          <View>
            <View style={styles.mainInfo}>
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
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.infoHint}>Information about this set</Text>
          <Divider style={styles.divider}></Divider>
        </View>

        <View style={styles.sectionContent}>
          <View
            style={{
              height: 90,
              justifyContent: "space-between",
            }}
          >
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
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.infoHint}>Minifigs included in this set</Text>
          <Divider style={styles.divider}></Divider>
        </View>

        <View style={styles.sectionContent}>{this.renderMinifigs()}</View>

        <View style={styles.sectionTitle}>
          <Text style={styles.infoHint}>Parts included in this set</Text>
          <Divider style={styles.divider}></Divider>
        </View>

        <View style={styles.sectionContent}>{this.renderParts()}</View>

        {/* <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={this.onCloseModal}
            >
              {this.renderModal()}
            </Modal> */}
      </ScrollView>
    );
  }

  renderParts = () => {
    const parts = this.state.parts;
    if (parts.length > 0) {
      return (
        <View style={styles.partStack}>
          {[...this.state.parts].map((part) => {
            return this.renderPart(part);
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ fontStyle: "italic" }}>No parts to display...</Text>
        </View>
      );
    }
  };

  renderPart = (part: LegoPart) => {
    return (
      <TouchableOpacity
        key={part.ID + Math.random()}
        onPress={() => this.showToastMessage(part.Name)}
      >
        <Image
          source={{ uri: part.ImgUrl }}
          style={styles.partImg}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        ></Image>

        <View style={{ flexDirection: "row", width: 70 }}>
          <Text style={styles.partQuantity}>x{part.quantity}</Text>
          {/* <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ marginRight: 10 }}
          >
            {part.Name}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  renderMinifigs = () => {
    const minifigs = this.state.minifigs;
    if (minifigs.length > 0) {
      return (
        <View style={styles.partStack}>
          {[...this.state.minifigs].map((fig) => {
            //return this.renderMinifig(fig);
            return (
              <MinifigTile fig={fig} showToastMessage={this.showToastMessage} />
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ fontStyle: "italic" }}>No minifig to display...</Text>
        </View>
      );
    }
  };

  // renderMinifig = (fig: LegoMinifig) => {
  //   return (
  //     <TouchableOpacity
  //       key={fig.ID + Math.random()}
  //       onPress={() => this.showToastMessage(fig.Name)}
  //     >
  //       <Image
  //         source={{ uri: fig.ImgUrl }}
  //         style={styles.partImg}
  //         resizeMethod={"scale"}
  //         resizeMode={"contain"}
  //       ></Image>

  //       <View style={{ flexDirection: "row", width: 70 }}>
  //         <Text style={styles.partQuantity}>x{fig.quantity}</Text>
  //         <Text
  //           numberOfLines={1}
  //           ellipsizeMode="tail"
  //           style={{ marginRight: 10 }}
  //         >
  //           {fig.Name}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

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
  container: { backgroundColor: "rgb(250, 250, 250)" },
  picture: {
    flex: 1,
    minHeight: 300,
    width: "100%",
    alignSelf: "stretch",
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "gray",
    height: 0.3,
    width: 392,
    margin: 3,
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
  sectionTitle: {
    padding: 10,
  },
  sectionContent: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
    shadowColor: "black",
    borderRadius: 10,
    elevation: 4,
  },
  infoHint: {
    color: "tomato",
    fontSize: 21,
    marginBottom: 0,
    fontWeight: "bold",
  },
  partStack: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
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
