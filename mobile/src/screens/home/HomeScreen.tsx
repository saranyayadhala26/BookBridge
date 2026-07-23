import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import BookCard from "../../components/BookCard";
import { getAllBooks, searchBooks } from "../../services/bookService";

type User = {
  fullName: string;
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

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const loadBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data.books);
      setFilteredBooks(data.books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBooks();
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredBooks}
      keyExtractor={(item) => item._id}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            loadBooks();
          }}
        />
      }
      ListHeaderComponent={
        <View style={styles.header}>

          <Text style={styles.welcome}>
            👋 Welcome,
          </Text>

          <Text style={styles.name}>
            {user?.fullName}
          </Text>

          <TextInput
  placeholder="Search books..."
  style={styles.search}
  value={search}
  onChangeText={async (text) => {
    setSearch(text);

    if (text.trim() === "") {
      setFilteredBooks(books);
      return;
    }

    try {
      const data = await searchBooks(text);
      setFilteredBooks(data.books);
    } catch (error) {
      console.log(error);
    }
  }}
/>

          <Text style={styles.heading}>
            Available Books
          </Text>

        </View>
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
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 10,
  },

  welcome: {
    fontSize: 16,
    color: "#6B7280",
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },

  search: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    marginBottom: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
});