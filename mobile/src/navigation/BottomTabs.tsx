import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import MyBooksScreen from "../screens/books/MyBooksScreen";
import AddBookScreen from "../screens/books/AddBookScreen";
import BorrowRequestsScreen from "../screens/borrow/BorrowRequestsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Books") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Add") {
            iconName = "add-circle";
          } else if (route.name === "Borrow") {
            iconName = focused
              ? "swap-horizontal"
              : "swap-horizontal-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person"
              : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={route.name === "Add" ? 42 : 24}
              color={
                route.name === "Add"
                  ? "#2563EB"
                  : color
              }
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Books"
        component={MyBooksScreen}
      />

      <Tab.Screen
  name="Add"
  component={AddBookScreen}
  options={{
    tabBarButton: (props) => (
      <TouchableOpacity
         onPress={props.onPress}
         onLongPress={props.onLongPress || undefined}
        style={{
          top: -15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            backgroundColor: "#2563EB",
            justifyContent: "center",
            alignItems: "center",
            elevation: 8,
          }}
        >
          <Ionicons
            name="add"
            size={28}
            color="#FFFFFF"
          />
        </View>
      </TouchableOpacity>
    ),
  }}
/>

      <Tab.Screen
        name="Borrow"
        component={BorrowRequestsScreen}
      />

      <Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    headerShown: true,
    title: "Your Account",
    headerTitleAlign: "center",
  }}
/>
      
    </Tab.Navigator>
  );
}