import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, ActivityIndicator } from "react-native";
import { Divider } from "react-native-elements";
import legodbapi from "../services/legodbapi.service";
import LegoTheme from "../services/legotheme.model";
import { ScrollView } from "react-native-gesture-handler";
import LegoSet from "../services/legoset.model";
import { SetDetailScreenProps } from "../navigation/app-stacks";
import LegoPart from "../services/legopart.model";
import Toast from "react-native-fast-toast";
import LegoMinifig from "../services/legominifig.model";
import PartTilesList from "../components/PartTilesList";
import MinifigTilesList from "../components/MinifigTilesList";
import SetInformationBlock from "../components/SetInformationBlock";
import SetPresentationBlock from "../components/SetPresentationBlock";

interface SetDetailScreenState {
  set: LegoSet;
  theme: LegoTheme;
  parts: LegoPart[];
  minifigs: LegoMinifig[];
  partsLoading: boolean;
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
    partsLoading: true,
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
          this.setState({ parts: legoParts, partsLoading: false });
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
    return (
      <ScrollView style={styles.container}>
        <SetPresentationBlock set={set} theme={theme} />

        <View style={styles.sectionTitle}>
          <Text style={styles.infoHint}>Information about this set</Text>
          <Divider style={styles.divider}></Divider>
        </View>
        <SetInformationBlock set={set} theme={theme} />

        <View style={styles.sectionTitle}>
          <Text style={styles.infoHint}>Minifigs included in this set</Text>
          <Divider style={styles.divider}></Divider>
        </View>

        <View style={styles.sectionContent}>
          <MinifigTilesList
            minifigs={this.state.minifigs}
            onMinifigPress={this.showToastMessage}
          />
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.infoHint}>Parts included in this set</Text>
          <Divider style={styles.divider}></Divider>
        </View>

        <View style={styles.sectionContent}>
          {this.state.partsLoading ? (
            <ActivityIndicator
              color="tomato"
              style={{ alignSelf: "center", marginTop: 20 }}
            />
          ) : (
            <PartTilesList
              parts={this.state.parts}
              onPartPress={this.showToastMessage}
            />
          )}
        </View>

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
  divider: {
    backgroundColor: "gray",
    height: 0.3,
    width: 392,
    margin: 3,
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
