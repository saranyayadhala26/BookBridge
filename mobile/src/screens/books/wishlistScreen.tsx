import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BookCard from "../../components/BookCard";
import {
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  condition: string;
  location: string;
  coverImage: string;
};

export default function WishlistScreen() {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();

const books = data.wishlist.map((item: any) => item.book);

setBooks(books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const handleRemove = async (bookId: string) => {
  try {
    const response = await removeFromWishlist(bookId);

    Alert.alert(
      "Success",
      response.message || "Book removed from wishlist."
    );

    loadWishlist();
  } catch (error: any) {
    Alert.alert(
      "Error",
      error?.response?.data?.message ||
        "Failed to remove book from wishlist."
    );
  }
};

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={
        <Text style={styles.heading}>
          ❤️ My Wishlist
        </Text>
      }
      renderItem={({ item }) => (
  <View>
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

    <TouchableOpacity
      style={{
        backgroundColor: "#DC2626",
        marginHorizontal: 16,
        marginBottom: 15,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
      }}
      onPress={() => handleRemove(item._id)}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        🗑 Remove from Wishlist
      </Text>
    </TouchableOpacity>
  </View>
)}
      ListEmptyComponent={
        <Text style={styles.empty}>
          Your wishlist is empty.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 20,
    color: "#111827",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#6B7280",
  },
});