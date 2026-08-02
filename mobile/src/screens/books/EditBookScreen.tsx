import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { updateBook } from "../../services/bookService";

export default function EditBookScreen({ route, navigation }: any) {
  const { book } = route.params;

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(book.description || "");
  const [condition, setCondition] = useState(book.condition);
  const [location, setLocation] = useState(book.location || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateBook(book._id, {
        title,
        author,
        category,
        description,
        condition,
        location,
      });

      Alert.alert("Success", "Book updated successfully.");

      navigation.goBack();
    } catch (error: any) {
      console.log(error.response?.data || error);

      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update book."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subTitle}>
  Update your book details
</Text>

<Text style={styles.sectionTitle}>
  📚 Book Information
</Text>

      <Text style={styles.label}>📖 Book Title</Text>

<TextInput
  style={styles.input}
  value={title}
  onChangeText={setTitle}
/>

<Text style={styles.label}>✍️ Author</Text>

<TextInput
  style={styles.input}
  value={author}
  onChangeText={setAuthor}
/>

<Text style={styles.label}>🏷️ Category</Text>

<TextInput
  style={styles.input}
  value={category}
  onChangeText={setCategory}
/>

<Text style={styles.label}>📝 Description</Text>

<TextInput
  style={styles.input}
  value={description}
  multiline={true}
  numberOfLines={4}
  onChangeText={setDescription}
/>

<Text style={styles.label}>⭐ Condition</Text>

<TextInput
  style={styles.input}
  value={condition}
  onChangeText={setCondition}
/>

<Text style={styles.label}>📍 Location</Text>

<TextInput
  style={styles.input}
  value={location}
  onChangeText={setLocation}
/>

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Update Book"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  subTitle: {
    color: "#6B7280",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
},

sectionTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#111827",
  marginBottom: 20,
},

label: {
  fontSize: 14,
  fontWeight: "600",
  color: "#374151",
  marginBottom: 6,
  marginTop: 5,
},
});