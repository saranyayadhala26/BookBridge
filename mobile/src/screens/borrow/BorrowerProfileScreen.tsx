import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";

export default function BorrowerProfileScreen({ route }: any) {
  const { borrower } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.borrowerName}>
        👤 {borrower?.fullName || "Reader"}
      </Text>

      <View style={styles.card}>
        <Text style={styles.item}>
          ⭐ Trust Score: {borrower?.trustScore || 100}/100
        </Text>

        <Text style={styles.item}>
          📚 Books Borrowed: {borrower?.booksBorrowed || 0}
        </Text>

        <Text style={styles.item}>
          📖 Books Shared: {borrower?.booksShared || 0}
        </Text>

        <Text style={styles.item}>
          📍 Location: {borrower?.location || "Not Available"}
        </Text>

        <TouchableOpacity
  style={{
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  }}
  onPress={() =>
    Alert.alert(
      "Coming Soon",
      "Messaging feature will be available in future updates."
    )
  }
>
  <Text
    style={{
      color: "#fff",
      fontWeight: "700",
    }}
  >
    💬 Chat with Reader
  </Text>
</TouchableOpacity>

        <Text style={{color: "#16A34A",fontWeight: "700",marginTop: 10,}}>
            🟢 Trusted Reader
        </Text>

        <Text style={styles.item}>📅 Member Since: July 2026</Text>
        
        </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  borrowerName: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },

  item: {
    fontSize: 16,
    marginBottom: 15,
  },
});