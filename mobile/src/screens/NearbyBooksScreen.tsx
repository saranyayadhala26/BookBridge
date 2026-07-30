import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import BookCard from "../components/BookCard";
import { getAllBooks } from "../services/bookService";

type User = {
  fullName: string;
  location?: string;
};

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  condition: string;
  location: string;
  coverImage: string;
};

export default function NearbyBooksScreen() {
  const navigation = useNavigation<any>();

  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        setUser(JSON.parse(userData));
      }

      const response = await getAllBooks();
      setBooks(response.books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const nearbyBooks = books;

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <FlatList
      data={nearbyBooks}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <Text style={styles.title}>
          📍 Books Near {user?.location || "You"}
        </Text>
      }
      renderItem={({ item }) => (
        <BookCard
          title={item.title}
          author={item.author}
          category={item.category}
          condition={item.condition}
          location={item.location}
          coverImage={item.coverImage}
          onPress={() =>
            navigation.navigate("BookDetails", {
              book: item,
            })
          }
        />
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>
          No books available near your location.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280",
    fontSize: 16,
  },
});