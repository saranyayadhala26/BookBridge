import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { addBook } from "../../services/addBookService";

export default function AddBookScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleAddBook = async () => {
    if (
      !title ||
      !author ||
      !category ||
      !description ||
      !condition ||
      !location ||
      !image
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await addBook({
        title,
        author,
        category,
        description,
        condition,
        location,
        image,
      });

      Alert.alert("Success", "Book added successfully!");

      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", "Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
  📚 Add New Book
</Text>

<Text style={styles.subtitle}>
  Share your books with the BookBridge community
</Text>
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image.uri }}
            style={styles.image}
          />
        ) : (
          <View style={styles.uploadContent}>
  <Text style={styles.uploadIcon}>
    📷
  </Text>

  <Text style={styles.uploadText}>
    Tap to upload cover image
  </Text>
</View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />

      <TextInput
        style={styles.input}
        placeholder="Programming, Novel, Science..."
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
  style={[styles.input, styles.descriptionInput]}
  placeholder="Description"
  value={description}
  onChangeText={setDescription}
  multiline
  textAlignVertical="top"
/>

      <TextInput
        style={styles.input}
        placeholder="New, Good, Fair..."
        value={condition}
        onChangeText={setDescription}
        
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddBook}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
         {loading ? "Uploading..." : "📚 Publish Book"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  paddingHorizontal: 20,
  paddingBottom: 40,
},
  heading: {
  fontSize: 28,
  fontWeight: "800",
  color: "#111827",
  marginTop: 20,
},

subtitle: {
  fontSize: 15,
  color: "#6B7280",
  marginTop: 6,
  marginBottom: 24,
},

  imagePicker: {
    height: 220,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    borderStyle: "dashed",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  descriptionInput: {
  height: 110,
  paddingTop: 12,
},

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  uploadContent: {
  alignItems: "center",
},

uploadIcon: {
  fontSize: 42,
  marginBottom: 10,
},

uploadText: {
  fontSize: 16,
  color: "#6B7280",
},
});