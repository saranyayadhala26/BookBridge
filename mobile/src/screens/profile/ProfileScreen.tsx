import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { logout } = useAuth();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");

      if (data) {
        setUser(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          logout();
        },
      },
    ]
  );
};
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user?.fullName
  ?.split(" ")
  .map((n: string) => n[0])
  .join("")
  .substring(0, 2)
  .toUpperCase()}
        </Text>
      </View>

      <Text style={styles.name}>
        {user?.fullName}
      </Text>

      <Text style={styles.email}>
        {user?.email}
      </Text>

      <View style={styles.trustCard}>
  <Text style={styles.trustTitle}>
    ⭐ Trust Score
  </Text>

  <Text style={styles.trustScore}>
    {user?.trustScore || 100}/100
  </Text>

  <Text style={styles.trustStatus}>
    Trusted Reader
  </Text>
</View>

      <View style={styles.menuContainer}>

  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>📚 My Books</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}
  onPress={() => navigation.navigate("Wishlist")}>
    <Text style={styles.menuText}>❤️ My Wishlist</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>🔔 Notifications</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}
   onPress={() => navigation.navigate("EditProfile")}>
    <Text style={styles.menuText}>✏️ Edit Profile</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>

</View>

<TouchableOpacity
  style={styles.logoutButton}
  onPress={handleLogout}
>
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>

</View>
);
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    padding: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },

  email: {
    color: "#6B7280",
    marginBottom: 30,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  label: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 4,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  logoutButton: {
  width: "100%",
  backgroundColor: "#EF4444",
  paddingVertical: 15,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 20,
},

logoutText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "bold",
},

menuContainer: {
  width: "100%",
  marginTop: 20,
},

menuItem: {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 18,
  marginBottom: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  elevation: 2,
},

menuText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#111827",
},

arrow: {
  fontSize: 22,
  color: "#9CA3AF",
},

trustCard: {
  backgroundColor: "#FFFFFF",
  padding: 16,
  borderRadius: 12,
  width: "100%",
  alignItems: "center",
  marginBottom: 20,
  elevation: 2,
},

trustTitle: {
  fontSize: 16,
  fontWeight: "600",
},

trustScore: {
  fontSize: 28,
  fontWeight: "bold",
  color: "#2563EB",
  marginTop: 5,
},

trustStatus: {
  color: "#6B7280",
  marginTop: 4,
},
});