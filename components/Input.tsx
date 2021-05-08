import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

interface InputProps {
  onSubmitEditing: Function;
  placeholder: string;
  clearAfterSubmit: boolean;
  showDismissButton: boolean;
  onDismissPress: Function;
}

interface InputState {
  text: string;
  dismissVisible: boolean;
}

export default class Input extends React.Component<InputProps, InputState> {
  state: InputState = {
    text: "",
    dismissVisible: false,
  };

  static defaultProps = {
    clearAfterSubmit: true,
    showDismissButton: false,
    onDismissPress: () => {},
  };

  onPress = () => {
    this.props.onDismissPress();
    this.setState({ text: "", dismissVisible: false });
  };

  onSubmitEditing = () => {
    const { text } = this.state;

    if (!text) return;
    this.props.onSubmitEditing(text);

    if (this.props.clearAfterSubmit) this.setState({ text: "" });
  };

  onChangeText = (text: string) => {
    this.setState({ text: text });

    if (!this.state.dismissVisible && text != "") {
      this.setState({ dismissVisible: true });
    }

    if (this.state.dismissVisible && text == "")
      this.setState({ dismissVisible: false });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <Ionicons name="search" size={25} color="gray" />
        <TextInput
          style={styles.input}
          value={text}
          placeholder={placeholder}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.onChangeText}
        />
        <TouchableOpacity
          onPress={this.onPress}
          style={[
            styles.dismiss,
            { display: this.state.dismissVisible ? "flex" : "none" },
          ]}
        >
          <Icon name={"close"} color={"white"} size={15} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCF3CF",
    height: 50,
    width: 370,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dismiss: {
    marginRight: 5,
    backgroundColor: "darkgray",
    borderRadius: 100,
    padding: 3,
  },
});
