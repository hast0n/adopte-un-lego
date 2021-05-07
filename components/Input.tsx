import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
  onSubmitEditing: Function;
  placeholder: string;
}

interface InputState {
  text: string;
}

export default class Input extends React.Component<InputProps, InputState> {
  state: InputState = {
    text: "",
  };

  onSubmitEditing = () => {
    const { text } = this.state;

    if (!text) return;
    this.props.onSubmitEditing(text);

    this.setState({ text: "" });
  };

  onChangeText = (text: string) => {
    this.setState({ text: text });
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
});
