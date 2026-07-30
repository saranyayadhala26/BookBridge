import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
};

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
}: Props) {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={icon}
        size={22}
        color="#6B7280"
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidePassword}
        keyboardType={keyboardType}
        style={styles.input}
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Ionicons
            name={
              hidePassword
                ? "eye-off-outline"
                : "eye-outline"
            }
            size={22}
            color="#6B7280"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    paddingHorizontal: 18,

    height: 60,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  input: {
    flex: 1,

    marginLeft: 12,

    fontSize: 16,

    color: "#111827",
  },
});