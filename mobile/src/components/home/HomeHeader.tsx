import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  userName: string;
  onNotificationPress?: () => void;
};

export default function HomeHeader({ userName, onNotificationPress }: Props) {
  return (
    <View style={styles.container}>
  <View style={styles.headerRow}>
    <Text style={styles.greeting}>
      Hi, {userName} 👋
    </Text>

    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.notificationButton}
      onPress={onNotificationPress}
      focusable={false}
    >
      <Text style={styles.notificationIcon}>🔔</Text>
    </TouchableOpacity>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 35,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    paddingTop: 10,
  },

  notificationButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  elevation: 2,
},
notificationIcon: {
  fontSize: 20,
},
headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
});