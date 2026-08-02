import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileScreen({navigation}: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user");

    if (data) {
      const user = JSON.parse(data);

      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setLocation(user.location || "");
    }
  };

  const handleSave = async () => {
    const data = await AsyncStorage.getItem("user");

    if (!data) return;

    const user = JSON.parse(data);

    const updatedUser = {
      ...user,
      fullName,
      email,
      location,
    };

    await AsyncStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    Alert.alert(
  "Success",
  "Profile updated successfully!",
  [
    {
      text: "OK",
      onPress: () => navigation.goBack(),
    },
  ]
);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        👤  Full Name
      </Text>

      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>
        ✉️  Email
      </Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>
        📍 Location
      </Text>

      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter your city"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  label: {
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  saveButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});