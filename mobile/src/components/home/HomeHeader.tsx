import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  userName: string;
};

export default function HomeHeader({ userName }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hi, {userName} 👋
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 35,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    paddingTop: 10,
  },
});