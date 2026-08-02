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

export default function BorrowRequestsScreen({navigation}: any) {
  const [loading, setLoading] = useState(true);
  const [borrowed, setBorrowed] = useState<any[]>([]);
  const [lent, setLent] = useState<any[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);

      const borrowedData = await getMyBorrowedBooks();
      const lentData = await getMyLentBooks();
      console.log("LENT DATA:", JSON.stringify(lentData, null, 2));
      
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
                <Text style={styles.title}>📖 {item.book?.title || "Book Request"}</Text>
                
                <TouchableOpacity
  onPress={() => {
    console.log("Borrower Data:", item.borrower);

    navigation.navigate("BorrowerProfile", {
      borrower: item.borrower,
    });
  }}
>

 <Text style={styles.borrowerName}>
  👤 {item.borrower?.fullName || "Reader"}
</Text>

</TouchableOpacity>
                <View
  style={[
    styles.statusBadge,
    item.status === "Pending"
      ? styles.pending
      : item.status === "Accepted"
      ? styles.accepted
      : item.status === "Rejected"
      ? styles.rejected
      : styles.returned,
  ]}
>
  <Text style={styles.statusText}>
    {item.status === "Pending"
      ? "🟡 Pending"
      : item.status === "Accepted"
      ? "🟢 Accepted"
      : item.status === "Rejected"
      ? "🔴 Rejected"
      : "🔵 Returned"}
  </Text>
</View>

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
          <Text style={styles.title}>{item.book?.title || "Book Request"}</Text>
          <View
  style={[
    styles.statusBadge,
    item.status === "Pending"
      ? styles.pending
      : item.status === "Accepted"
      ? styles.accepted
      : item.status === "Rejected"
      ? styles.rejected
      : styles.returned,
  ]}
>
  <Text style={styles.statusText}>
  {item.status === "Pending"
    ? "🟡 Pending"
    : item.status === "Accepted"
    ? "🟢 Accepted"
    : item.status === "Rejected"
    ? "🔴 Rejected"
    : "🔵 Returned"}
</Text>
</View>

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
        <View style={styles.emptyContainer}>
  <Text style={styles.emptyIcon}>📚</Text>

  <Text style={styles.emptyTitle}>
    No borrowed books yet
  </Text>

  <Text style={styles.emptySubtitle}>
    Browse books and send a request.
  </Text>
</View>
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
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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

  statusBadge: {
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
  marginTop: 10,
},

pending: {
  backgroundColor: "#FEF3C7",
},

accepted: {
  backgroundColor: "#DCFCE7",
},

rejected: {
  backgroundColor: "#FEE2E2",
},

returned: {
  backgroundColor: "#DBEAFE",
},

statusText: {
  textAlign: "center",
  fontWeight: "600",
},

borrower: {
  color: "#4B5563",
  marginTop: 5,
},

emptyContainer: {
  alignItems: "center",
  marginTop: 40,
},

emptyIcon: {
  fontSize: 40,
},

emptyTitle: {
  fontSize: 16,
  fontWeight: "600",
  marginTop: 10,
},

emptySubtitle: {
  color: "#6B7280",
  marginTop: 5,
},

borrowerName: {
  color: "#2563EB",
  fontWeight: "600",
  marginTop: 5,
},
});