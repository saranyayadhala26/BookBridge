import React, { useState } from "react";
import {
  View,
 FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import BookCard from "../../components/BookCard";
import { getMyBooks } from "../../services/profileService";
import { deleteBook } from "../../services/bookService";
type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  condition: string;
  location: string;
  coverImage: string;
};

export default function MyBooksScreen() {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  const loadMyBooks = async () => {
    try {
      const data = await getMyBooks();
      setBooks(data.books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
  React.useCallback(() => {
    loadMyBooks();
  }, [])
);
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const handleDelete = (bookId: string) => {
  Alert.alert(
    "Delete Book",
    "Are you sure you want to delete this book?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteBook(bookId);
            loadMyBooks();
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to delete book.");
          }
        },
      },
    ]
  );
};

  return (
    <FlatList
      data={books}
      keyExtractor={(item, index) => item?._id ?? index.toString()}
      ListHeaderComponent={
        <Text style={styles.heading}>
          📚 My Books
        </Text>
      }
      
      renderItem={({ item }) => (
  <View style={styles.cardContainer}>
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
    

    <View style={styles.buttonRow}>
  <TouchableOpacity
    style={styles.editButton}
    onPress={() =>
      navigation.navigate("EditBook", {
        book: item,
      })
    }
  >
    <Text style={styles.buttonText}>✏️ Edit</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.deleteButton}
    onPress={() => handleDelete(item._id)}
  >
    <Text style={styles.buttonText}>🗑 Delete</Text>
  </TouchableOpacity>
</View>
  </View>
)}

      ListEmptyComponent={
        <Text style={styles.empty}>
          You haven't added any books yet.
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

  cardContainer: {
  marginBottom: 20,
},

deleteButton: {
  flex: 1,
  backgroundColor: "#DC2626",
  paddingVertical: 10,
  borderRadius: 8,
  alignItems: "center",
},

buttonText: {
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: 16,
},

buttonRow: {
  flexDirection: "row",
  marginHorizontal: 20,
  marginTop: 8,
  gap: 10,
},

editButton: {
  flex: 1,
  backgroundColor: "#2563EB",
  paddingVertical: 10,
  borderRadius: 8,
  alignItems: "center",
},
});