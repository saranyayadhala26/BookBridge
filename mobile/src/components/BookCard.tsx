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
  category: string;
  condition: string;
  location: string;
  coverImage?: string;
  onPress?: () => void;
};

export default function BookCard({
  title,
  author,
  category,
  condition,
  location,
  coverImage,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {coverImage ? (
        <Image
          source={{ uri: coverImage }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📚</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <Text style={styles.author}>
          {author}
        </Text>

        <Text style={styles.category}>
          {category}
        </Text>

        <View style={styles.row}>
          <Text style={styles.condition}>
            ⭐ {condition}
          </Text>

          <Text style={styles.location}>
            📍 {location || "Unknown"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
  },

  image: {
    width: 90,
    height: 120,
    borderRadius: 10,
  },

  placeholder: {
    width: 90,
    height: 120,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 36,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  author: {
    fontSize: 15,
    color: "#6B7280",
  },

  category: {
    color: "#2563EB",
    fontWeight: "600",
  },

  row: {
    marginTop: 10,
  },

  condition: {
    color: "#059669",
    fontWeight: "600",
  },

  location: {
    marginTop: 4,
    color: "#6B7280",
  },
});