import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

type Props = {
  title: string;
  author: string;
  coverImage: string;
  location: string;
  onPress: () => void;
};

export default function NearbyBookCard({
  title,
  author,
  coverImage,
  location,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image
        source={{ uri: coverImage }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={styles.title}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.author}
        >
          {author}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.location}
        >
          📍 {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 15,

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#E5E7EB",
  },

  content: {
    padding: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  author: {
    marginTop: 5,
    color: "#6B7280",
    fontSize: 13,
  },

  location: {
    marginTop: 8,
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "600",
  },
});