import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { requestBook } from "../../services/borrowService";
import { addToWishlist } from "../../services/wishlistService";

export default function BookDetailsScreen({ route }: any) {
  const { book } = route.params;

  const handleBorrow = async () => {
  try {
    const response = await requestBook(book._id);

    Alert.alert(
      "Success",
      response.message || "Borrow request sent successfully."
    );
  } catch (error: any) {
  console.log("Borrow Error:", error.response?.data);
  console.log("Status:", error.response?.status);
  console.log("Full Error:", error);

  Alert.alert(
    "Error",
    error?.response?.data?.message || "Failed to send borrow request."
  );
}
};

const handleWishlist = async () => {
  try {
    const response = await addToWishlist(book._id);

    Alert.alert(
      "Success",
      response.message || "Book added to wishlist."
    );
  } catch (error: any) {
    Alert.alert(
      "Error",
      error?.response?.data?.message || "Failed to add book to wishlist."
    );
  }
};

  return (
    <ScrollView style={styles.container}>
      {book.coverImage ? (
        <Image source={{ uri: book.coverImage }} style={styles.CoverImage} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📚</Text>
          <Text style={styles.noImageTitle}>No Cover Image</Text>
          <Text style={styles.noImageSubTitle}>Book cover not available</Text>
          </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>

        <Text style={styles.author}>
          👤 {book.author}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{book.category}</Text>
        </View>

        <Text style={styles.label}>⭐ Condition</Text>
        <Text style={styles.value}>{book.condition}</Text>

        <Text style={styles.label}>📍 Location</Text>
        <Text style={styles.value}>{book.location || "Unknown"}</Text>

        <Text style={styles.label}>📝 Description</Text>
        <Text style={styles.value}>
          {book.description || "No description available."}
        </Text>
    <View style={styles.passportCard}>
  <Text style={styles.passportTitle}>
    📖 Book Passport
  </Text>

  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>👤 Owner</Text>
    <Text style={styles.infoValue}>
      {book.owner?.fullName || "BookBridge User"}
    </Text>
  </View>

  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>📚 Borrow Count</Text>
    <Text style={styles.infoValue}>
      {book.borrowCount || 0}
    </Text>
  </View>

  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>✅ Status</Text>
    <Text style={styles.infoValue}>
      {book.availability ? "Available" : "Borrowed"}
    </Text>
  </View>
</View>
</View>
        <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.borrowButton}
    onPress={handleBorrow}
  >
    <Text style={styles.buttonText}>Borrow Book</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.wishlistButton}
    onPress={handleWishlist}
  >
    <Text style={styles.buttonText}>❤️ Add to Wishlist</Text>
  </TouchableOpacity>
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 0,
    elevation: 2,
  },

  CoverImage: {
    width: "100%",
    height: 260,
    resizeMode: "cover",
    borderRadius:16,
  },

  placeholder: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius:  20,
  },

  placeholderText: {
    fontSize: 80,
  },

  content: {
    padding: 16,
    marginTop:5,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",

  },

  author: {
    marginTop: 8,
    fontSize: 18,
    color: "#6B7280",
  },

  badge: {
    marginTop: 15,
    alignSelf: "flex-start",
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },

  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  value: {
    marginTop: 6,
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
  },

  buttonContainer: {
  marginTop: 30,
  gap: 15,
  marginBottom:30,
},

borrowButton: {
  backgroundColor: "#2563EB",
  paddingVertical: 15,
  borderRadius: 12,
  alignItems: "center",
},

wishlistButton: {
  backgroundColor: "#EC4899",
  paddingVertical: 15,
  borderRadius: 12,
  alignItems: "center",
},

buttonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold",
},

noImageTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#374151",
  marginTop: 10,
},

noImageSubTitle: {
  fontSize: 14,
  color: "#6B7280",
  marginTop: 5,
},

passportCard: {
  backgroundColor: "#F8FAFC",
  borderRadius: 16,
  padding: 18,
  marginTop: 20,
  borderWidth: 1,
  borderColor: "#E2E8F0",
},

passportTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#111827",
  marginBottom: 15,
},

infoRow: {
  marginBottom: 12,
},

infoLabel: {
  fontSize: 14,
  color: "#6B7280",
  marginBottom: 4,
},

infoValue: {
  fontSize: 16,
  fontWeight: "600",
  color: "#111827",
},
});