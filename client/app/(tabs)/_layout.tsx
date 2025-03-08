import React from "react";
import { Tabs } from "expo-router";
import colors from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.activeTab,
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerShadowVisible: false,
        headerTintColor: colors.headerTintColor,
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          // paddingBottom: 10,
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          // height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "storefront-sharp" : "storefront-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Find Products",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid-sharp" : "grid-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart-sharp" : "cart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favourite",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "account",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
