import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import MyBooksScreen from "../screens/books/MyBooksScreen";
import AddBookScreen from "../screens/books/AddBookScreen";
import BorrowRequestsScreen from "../screens/borrow/BorrowRequestsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import WishlistScreen from "../screens/books/wishlistScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Books" component={MyBooksScreen} />
      <Tab.Screen name="Add Book" component={AddBookScreen} />
      <Tab.Screen name="Borrow" component={BorrowRequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
    </Tab.Navigator>
  );
}