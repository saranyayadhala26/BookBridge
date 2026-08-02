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
import SupportHelpScreen from "../screens/profile/SupportHelpScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import NotificationsScreen from "../screens/profile/NotificationsScreen";
import MyBooksScreen from "../screens/books/MyBooksScreen";
import ChatScreen from "../screens/home/ChatScreen";
import BorrowerProfileScreen from "../screens/borrow/BorrowerProfileScreen";

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

<Stack.Screen
  name="SupportHelp"
  component={SupportHelpScreen}
  options={{
    title: "Support & Help",
  }}
/>

<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: "Your Account",
  }}
/>

<Stack.Screen
  name="Notifications"
  component={NotificationsScreen}
  options={{
    title: "Notifications",
  }}
/>

<Stack.Screen
  name="MyBooks"
  component={MyBooksScreen}
  options={{
    title: "My Books",
  }}
/>

<Stack.Screen
  name="Chat"
  component={ChatScreen}
  options={{
    title: "Chats",
  }}
/>

<Stack.Screen
  name="BorrowerProfile"
  component={BorrowerProfileScreen}
  options={{
    title: "Borrower Profile",
  }}
/>
    
    </Stack.Navigator>
  );
}