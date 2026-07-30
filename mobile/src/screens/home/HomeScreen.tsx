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
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import BookCard from "../../components/BookCard";
import { getAllBooks, searchBooks } from "../../services/bookService";
import HomeHeader from "../../components/home/HomeHeader";
import SearchBar from "../../components/home/SearchBar";
import NearbyBooks from "../../components/home/NearbyBooks";
import CategoryGrid from "../../components/home/CategoryGrid";
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

  const nearbyBooks = [...books]
  .sort(() => 0.5 - Math.random())
  .slice(0, 3);

return (
  <FlatList
    data={filteredBooks}
    keyExtractor={(item, index) => item?._id ?? index.toString()}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.listContent}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => {
  setRefreshing(true);
  loadUser();
  loadBooks();
}}
      />
    }
    ListHeaderComponent={
  <>
    <HomeHeader
  userName={user?.fullName || "Reader"}
  onNotificationPress={() =>
    navigation.navigate("Notifications")
  }
/>

    <SearchBar
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

    <NearbyBooks
  books={nearbyBooks.slice(0, 3)}
  onBookPress={(book) =>
    navigation.navigate("BookDetails", {
      book,
    })
  }
  onSeeAll={() =>
    navigation.navigate("NearbyBooks")
  }
/>

    <CategoryGrid
      onCategoryPress={(category) => {
        if (category === "Others") {
  setFilteredBooks(books);
  return;
}

        const filtered = books.filter(
          (book) => book.category === category
        );

        setFilteredBooks(filtered);
      }}
    />
  </>
}
renderItem={() => null}
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
  paddingHorizontal: 20,
  paddingTop: 30,
  paddingBottom: 20,
  backgroundColor: "#2563EB",
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
},

  greeting: {
  color: "#DBEAFE",
  fontSize: 16,
},

subtitle: {
  color: "#E5E7EB",
  fontSize: 15,
  marginTop: 6,
},

  welcome: {
    fontSize: 16,
    color: "#6B7280",
  },

  name: {
  color: "#FFFFFF",
  fontSize: 30,
  fontWeight: "700",
  marginTop: 4,
},
  search: {
  height: 55,
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  paddingHorizontal: 18,
  fontSize: 16,
  marginTop: 20,
  marginBottom: 25,
  elevation: 5,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 3,
  },
},

  sectionTitle: {
  fontSize: 24,
  fontWeight: "700",
  color: "#111827",
},

listContent: {
  paddingHorizontal: 18,
  paddingBottom: 20,
},

searchContainer: {
  marginTop: 20,
},

sectionContainer: {
  paddingHorizontal: 20,
  marginTop: 20,
},

sectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

seeAll: {
  color: "#2563EB",
  fontWeight: "700",
},
});