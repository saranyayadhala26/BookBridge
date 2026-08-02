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
import { Picker } from "@react-native-picker/picker";
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
      <Text style={styles.label}>
  📖 Book Title
</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>
  ✍️ Author
</Text>
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />

      <Text style={styles.label}>📚 Category</Text>

<View style={styles.pickerContainer}>
  <Picker
    selectedValue={category}
    onValueChange={(itemValue) => setCategory(itemValue)}
  >
    <Picker.Item label="Select Category" value="" />

    <Picker.Item label="Novel" value="Novel" />
    <Picker.Item label="Programming" value="Programming" />
    <Picker.Item label="Science" value="Science" />
    <Picker.Item label="Self Help" value="Self Help" />
    <Picker.Item label="Biography" value="Biography" />
    <Picker.Item label="History" value="History" />
    <Picker.Item label="Technology" value="Technology" />
    <Picker.Item label="Education" value="Education" />
    <Picker.Item label="Business" value="Business" />
    <Picker.Item label="Other" value="Other" />
  </Picker>
</View>

<Text style={styles.label}>
  📝 Description
</Text>
      <TextInput
  style={[styles.input, styles.descriptionInput]}
  placeholder="Description"
  value={description}
  onChangeText={setDescription}
  multiline
  textAlignVertical="top"
/>

      <Text style={styles.label}>⭐ Condition</Text>

<View style={styles.pickerContainer}>
  <Picker
    selectedValue={condition}
    onValueChange={(itemValue) => setCondition(itemValue)}
  >
    <Picker.Item label="Select Condition" value="" />
    <Picker.Item label="New" value="New" />
    <Picker.Item label="Like New" value="Like New" />
    <Picker.Item label="Good" value="Good" />
    <Picker.Item label="Fair" value="Fair" />
    <Picker.Item label="Poor" value="Poor" />
  </Picker>
</View>

<Text style={styles.label}>
  📍 Location
</Text>
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
  marginTop: 0,
  marginBottom: 10,
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

pickerContainer: {
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 10,
  marginBottom: 15,
  backgroundColor: "#fff",
},


label: {
  fontSize: 14,
  fontWeight: "600",
  color: "#374151",
  marginBottom: 6,
  marginTop: 10,
},
});