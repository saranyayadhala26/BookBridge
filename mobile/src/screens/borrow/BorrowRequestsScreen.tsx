import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  getMyBorrowedBooks,
  getMyLentBooks,
  acceptBorrowRequest,
  rejectBorrowRequest,
  returnBorrowedBook,
} from "../../services/borrowService";

export default function BorrowRequestsScreen() {
  const [loading, setLoading] = useState(true);
  const [borrowed, setBorrowed] = useState<any[]>([]);
  const [lent, setLent] = useState<any[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);

      const borrowedData = await getMyBorrowedBooks();
      const lentData = await getMyLentBooks();

      setBorrowed(
  (borrowedData.borrowRequests || []).filter(
    (item: any) => item && item._id
  )
);

setLent(
  (lentData.lentBooks || []).filter(
    (item: any) => item && item._id
  )
);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load borrow requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const acceptRequest = async (id: string) => {
  try {
    const res = await acceptBorrowRequest(id);
    console.log("Accept Success:", res);

    await loadData();
  } catch (error: any) {
    console.log("Accept Error:", error.response?.data);
    console.log("Status:", error.response?.status);

    Alert.alert(
      "Error",
      error.response?.data?.message || "Unable to accept request."
    );
  }
};

  const rejectRequest = async (id: string) => {
    try {
      await rejectBorrowRequest(id);
      loadData();
    } catch {
      Alert.alert("Error", "Unable to reject request.");
    }
  };

  const returnBook = async (id: string) => {
    try {
      await returnBorrowedBook(id);
      loadData();
    } catch {
      Alert.alert("Error", "Unable to return book.");
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
      ListHeaderComponent={
        <>
          <Text style={styles.heading}>📥 Incoming Requests</Text>

          {lent.length === 0 ? (
            <Text style={styles.empty}>No incoming requests.</Text>
          ) : (
            lent.map((item) => (
              <View key={item._id} style={styles.card}>
                <Text style={styles.title}>{item.book?.title}</Text>
                <Text>Borrower: {item.borrower?.fullName}</Text>
                <Text>Status: {item.status}</Text>

                {item.status === "Pending" && (
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.accept}
                      onPress={() => acceptRequest(item._id)}
                    >
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.reject}
                      onPress={() => rejectRequest(item._id)}
                    >
                      <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}

          <Text style={[styles.heading, { marginTop: 30 }]}>
            📚 My Borrowed Books
          </Text>
        </>
      }
      data={borrowed}
      
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.book?.title}</Text>
          <Text>Status: {item.status}</Text>

          {item.status === "Accepted" && (
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => returnBook(item._id)}
            >
              <Text style={styles.buttonText}>Return Book</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>No borrowed books.</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    marginTop: 15,
  },

  accept: {
    flex: 1,
    backgroundColor: "#16A34A",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },

  reject: {
    flex: 1,
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },

  returnButton: {
    marginTop: 15,
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
  },
});