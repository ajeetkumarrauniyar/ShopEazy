import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react-native';

// Import screens
import HomeScreen from '../screens/main/HomeScreen';
import ExploreScreen from '../screens/main/ExploreScreen';
import CartScreen from '../screens/main/CartScreen';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import AccountScreen from '../screens/main/AccountScreen';
import ProductDetailScreen from '../screens/main/ProductDetailScreen';
import CheckoutScreen from '../screens/main/CheckoutScreen';
import OrderAcceptedScreen from '../screens/main/OrderAcceptedScreen';

// Define navigation types
type RootStackParamList = {
  Main: undefined;
  ProductDetail: {
    productId: string;
  };
  Checkout: {
    items: Array<{
      id: string;
      quantity: number;
    }>;
  };
  OrderAccepted: {
    orderId: string;
  };
};

type TabParamList = {
  Home: undefined;
  Explore: {
    category?: string;
    searchQuery?: string;
  };
  Cart: undefined;
  Favorites: undefined;
  Account: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const size = 24;

          if (route.name === 'Home') {
            return (
              <Home
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Explore') {
            return (
              <Search
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Cart') {
            return (
              <ShoppingCart
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Favorites') {
            return (
              <Heart
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Account') {
            return (
              <User
                size={size}
                color={color}
              />
            );
          }

          return null;
        },
        tabBarActiveTintColor: '#53B175',
        tabBarInactiveTintColor: '#7C7C7C',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
      />
      <Tab.Screen
        name='Explore'
        component={ExploreScreen}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
      />
      <Tab.Screen
        name='Favorites'
        component={FavoritesScreen}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Main'
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name='ProductDetail'
          component={ProductDetailScreen}
        />
        <Stack.Screen
          name='Checkout'
          component={CheckoutScreen}
        />
        <Stack.Screen
          name='OrderAccepted'
          component={OrderAcceptedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;


// import { createStackNavigator } from "@react-navigation/stack";
// import LoginScreen from "../screens/LoginScreen";
// import HomeScreen from "../screens/HomeScreen";

// const Stack = createStackNavigator();

// export default function RootNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }