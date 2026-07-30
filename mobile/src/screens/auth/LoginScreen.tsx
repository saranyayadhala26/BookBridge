import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import AuthInput from "../../components/AuthInput";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      await login(data.token, data.user);

      Alert.alert("Success", "Login Successful");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2563EB"
      >

      </StatusBar>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
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
    Books Connect. Minds Grow.
  </Text>
</LinearGradient>

<View style={styles.card}>

  <Text style={styles.subtitle}>
    Sign in to continue
  </Text>

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

  <TouchableOpacity>
    <Text style={styles.forgot}>
      Forgot Password?
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.loginButton}
    onPress={handleLogin}
  >
    <Text style={styles.loginText}>
      {loading ? "Signing In..." : "SIGN IN"}
    </Text>
  </TouchableOpacity>

  <View style={styles.footer}>

    <Text style={styles.footerText}>
      Don't have an account?
    </Text>

    <TouchableOpacity
      onPress={() => navigation.navigate("Register")}
    >
      <Text style={styles.register}>
        Create Account
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
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 18,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 34,
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
    marginTop: -40,
    borderRadius: 24,
    padding: 24,
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
    marginTop: 14,
  },

  forgot: {
    alignSelf: "flex-end",
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 26,
  },

  loginButton: {
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },

  footerText: {
    color: "#6B7280",
    fontSize: 15,
  },

  register: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 6,
  },
});