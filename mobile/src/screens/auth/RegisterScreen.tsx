import React from "react";
import { View, Text } from "react-native";

export default function RegisterScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Register Screen
      </Text>
    </View>
  );
}