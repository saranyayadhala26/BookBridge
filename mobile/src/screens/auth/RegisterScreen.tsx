import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import AuthInput from "../../components/AuthInput";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        "Error",
        "Please fill all fields"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match"
      );
      return;
    }

    Alert.alert(
      "Next Step",
      "We'll connect the backend in the next step."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2563EB"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom:20,
        }}
      >
      <LinearGradient
  colors={["#2563EB", "#4F46E5"]}
  style={styles.header}
>
  <Image
    source={require("../../../assets/logo.png")}
    style={styles.logo}
    resizeMode="contain"
  />

  <Text style={styles.appName}>
    BookBridge
  </Text>

  <Text style={styles.tagline}>
    Join our reading community
  </Text>
</LinearGradient>

<View style={styles.card}>

  <Text style={styles.welcome}>
    Create Account 📚
  </Text>

  <Text style={styles.subtitle}>
    Start your BookBridge journey
  </Text>

  <Text style={styles.label}>
    Full Name
  </Text>

  <AuthInput
    placeholder="Enter your full name"
    icon="person"
    value={name}
    onChangeText={setName}
  />

  <Text style={styles.label}>
    Email Address
  </Text>

  <AuthInput
    placeholder="Enter your email"
    icon="email"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
  />

  <Text style={styles.label}>
    Password
  </Text>

  <AuthInput
    placeholder="Enter your password"
    icon="lock"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />

  <Text style={styles.label}>
    Confirm Password
  </Text>

  <AuthInput
    placeholder="Confirm your password"
    icon="lock"
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    secureTextEntry
  />

  <TouchableOpacity
    style={styles.registerButton}
    onPress={handleRegister}
  >
    <Text style={styles.registerButtonText}>
      {loading ? "Creating Account..." : "CREATE ACCOUNT"}
    </Text>
  </TouchableOpacity>

  <View style={styles.footer}>
    <Text style={styles.footerText}>
      Already have an account?
    </Text>

    <TouchableOpacity
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.loginLink}>
        Sign In
      </Text>
    </TouchableOpacity>
  </View>

</View>

</ScrollView>

</SafeAreaView>
);
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 18,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  tagline: {
    color: "#E5E7EB",
    marginTop: 8,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 24,
    padding: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  welcome: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 28,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 8,
  },

  registerButton: {
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  footerText: {
    color: "#6B7280",
    fontSize: 15,
  },

  loginLink: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 6,
  },
});