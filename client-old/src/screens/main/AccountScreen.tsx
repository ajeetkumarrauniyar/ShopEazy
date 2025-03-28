import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const AccountScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      icon: require('../../assets/icons/orders.png'),
      screen: 'MyOrders',
    },
    {
      id: 'details',
      title: 'My Details',
      icon: require('../../assets/icons/user.png'),
      screen: 'MyDetails',
    },
    {
      id: 'addresses',
      title: 'Delivery Addresses',
      icon: require('../../assets/icons/location.png'),
      screen: 'DeliveryAddresses',
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: require('../../assets/icons/card.png'),
      screen: 'PaymentMethods',
    },
    {
      id: 'promo',
      title: 'Promo Codes',
      icon: require('../../assets/icons/promo.png'),
      screen: 'PromoCodes',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: require('../../assets/icons/bell.png'),
      screen: 'Notifications',
    },
    {
      id: 'help',
      title: 'Help',
      icon: require('../../assets/icons/help.png'),
      screen: 'Help',
    },
    {
      id: 'about',
      title: 'About',
      icon: require('../../assets/icons/info.png'),
      screen: 'About',
    },
  ];

  const handleMenuItemPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center p-5 border-b border-border`}>
        <Text style={tw`flex-1 text-xl font-bold text-center text-textPrimary`}>
          My Account
        </Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        {/* Profile Section */}
        <View style={tw`p-5 border-b border-border flex-row items-center`}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={tw`w-16 h-16 rounded-full mr-4`}
          />

          <View style={tw`flex-1`}>
            <Text style={tw`text-lg font-bold text-textPrimary mb-1`}>
              Rahul Sharma
            </Text>
            <Text style={tw`text-base text-textSecondary`}>
              rahul.sharma@example.com
            </Text>
          </View>

          <TouchableOpacity
            style={tw`p-2`}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Image
              source={require('../../assets/icons/edit.png')}
              style={tw`w-6 h-6`}
            />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={tw`p-5`}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={tw`flex-row items-center py-4 border-b border-border`}
              onPress={() => handleMenuItemPress(item.screen)}
            >
              <View
                style={tw`w-10 h-10 bg-secondary rounded-full justify-center items-center mr-4`}
              >
                <Image
                  source={item.icon}
                  style={tw`w-5 h-5`}
                />
              </View>

              <Text style={tw`flex-1 text-base text-textPrimary`}>
                {item.title}
              </Text>

              <Image
                source={require('../../assets/icons/chevron-right.png')}
                style={tw`w-6 h-6`}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={tw`p-5 mt-4`}>
          <TouchableOpacity
            style={tw`flex-row items-center py-4 border-b border-border`}
            onPress={handleLogout}
          >
            <View
              style={tw`w-10 h-10 bg-secondary rounded-full justify-center items-center mr-4`}
            >
              <Image
                source={require('../../assets/icons/logout.png')}
                style={tw`w-5 h-5`}
              />
            </View>

            <Text style={tw`flex-1 text-base text-red-500`}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`p-5 items-center mb-8`}>
          <Text style={tw`text-sm text-textSecondary`}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
