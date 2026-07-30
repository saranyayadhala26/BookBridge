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
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      {coverImage ? (
        <Image
          source={{ uri: coverImage }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>
            📚
          </Text>
        </View>
      )}

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

        <View style={styles.badgeRow}>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {category}
            </Text>
          </View>

          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>
              ⭐ {condition}
            </Text>
          </View>

        </View>

        <Text style={styles.location}>
          📍 {location || "Unknown"}
        </Text>

        <Text style={styles.viewDetails}>
          View Details →
        </Text>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginVertical: 10,
    borderRadius: 20,
    padding: 14,

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: 95,
    height: 135,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
  },

  placeholder: {
    width: 95,
    height: 135,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderEmoji: {
    fontSize: 40,
  },

  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },

  author: {
    marginTop: 5,
    fontSize: 15,
    color: "#6B7280",
  },

  badgeRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  categoryBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
  },

  categoryText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 12,
  },

  conditionBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  conditionText: {
    color: "#15803D",
    fontWeight: "700",
    fontSize: 12,
  },

  location: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },

  viewDetails: {
    marginTop: 12,
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 14,
  },
});