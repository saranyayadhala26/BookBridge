import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onChatPress?: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  onChatPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>

        <Ionicons
          name="search"
          size={22}
          color="#6B7280"
        />

        <TextInput
  value={value}
  onChangeText={onChangeText}
  placeholder="Search books..."
  returnKeyType="search"
  onSubmitEditing={() => {
    Keyboard.dismiss();
  }}

  blurOnSubmit={true}
/>

      </View>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={onChatPress}
      >
        <Ionicons
          name="chatbubble-ellipses"
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -18,
    marginBottom: 25,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 52,

    elevation: 6,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },

  chatButton: {
    width: 56,
    height: 56,
    marginLeft: 12,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",

    elevation: 6,

    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

});