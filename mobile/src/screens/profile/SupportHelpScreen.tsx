import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SupportHelpScreen() {
  return (
  <View style={styles.container}>
    <Text style={styles.title}>
      🎧 Support & Help
    </Text>

    <Text style={styles.subtitle}>
      Need help with BookBridge?
    </Text>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        📧 Contact Support
      </Text>

      <Text style={styles.cardText}>
        support@bookbridge.com
      </Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        📚 How to Borrow Books
      </Text>

      <Text style={styles.cardText}>
        Open a book and tap Borrow Book.
      </Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        ❤️ Wishlist Help
      </Text>

      <Text style={styles.cardText}>
        Save books from Book Details.
      </Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        ℹ️ App Version
      </Text>

      <Text style={styles.cardText}>
        BookBridge v1.0.0
      </Text>
    </View>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },

  subtitle: {
  fontSize: 16,
  color: "#6B7280",
  marginBottom: 20,
},

card: {
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  padding: 18,
  marginBottom: 15,
  elevation: 2,
},

cardTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#111827",
},

cardText: {
  marginTop: 6,
  color: "#6B7280",
  fontSize: 14,
},
});
