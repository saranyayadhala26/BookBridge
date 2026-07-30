import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import NearbyBookCard from "../NearbyBookCard";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  condition: string;
  location: string;
  coverImage: string;
};

type Props = {
  books: Book[];
  onBookPress: (book: Book) => void;
  onSeeAll?: () => void;
};

export default function NearbyBooks({
  books,
  onBookPress,
  onSeeAll,
}: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          📍 Books Near You
        </Text>

        <TouchableOpacity
  onPress={onSeeAll}
  disabled={!onSeeAll}
>
  <Text style={styles.seeAll}>
    See All →
  </Text>
</TouchableOpacity>

      </View>

      {books.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No books available near your location 📚
          </Text>

          <Text style={styles.emptySubtitle}>
            Update your location in Profile or ask your friends to list books nearby.
          </Text>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={books}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <NearbyBookCard
  title={item.title}
  author={item.author}
  coverImage={item.coverImage}
  location={item.location}
  onPress={() => onBookPress(item)}
/>
            </View>
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 12,
    marginBottom: 25,
  },

  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  seeAll: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 15,
  },

  cardContainer: {
    width: 185,
    marginLeft: 20,
    marginRight: 10,
  },

  emptyCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: "center",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  emptySubtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 15,
  },

});