import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NearbyBooksScreen from "../screens/NearbyBooksScreen";
import AuthNavigator from "./AuthNavigator";
import BottomTabs from "./BottomTabs";
import BookDetailsScreen from "../screens/books/BookDetailsScreen";
import EditBookScreen from "../screens/books/EditBookScreen";
import { useAuth } from "../context/AuthContext";
import wishlistScreen from "../screens/books/wishlistScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!token) {
    return <AuthNavigator />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
  name="NearbyBooks"
  component={NearbyBooksScreen}
  options={{
    title: "Nearby Books",
  }}
/>

      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{ title: "Book Details" }}
      />

      <Stack.Screen
        name="EditBook"
        component={EditBookScreen}
        options={{ title: "Edit Book" }}
      />

      <Stack.Screen
      name="Wishlist"
      component={wishlistScreen}
      options={{
        title: "My Wishlist",
      }}
    />

    <Stack.Screen
  name="EditProfile"
  component={EditProfileScreen}
  options={{
    title: "Edit Profile",
  }}
/>
    </Stack.Navigator>
  );
}