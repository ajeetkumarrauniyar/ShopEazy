import React, { useState } from 'react';
import { View, ScrollView, TextInput, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import SectionHeader from '../../components/SectionHeader';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';

// Mock data - would come from Firebase in production
const categories = [
  { id: '1', name: 'Fruits', image: require('./assets/images/categories/fruits.png') },
  {
    id: '2',
    name: 'Vegetables',
    image: require('./assets/images/categories/vegetables.png'),
  },
  { id: '3', name: 'Dairy', image: require('../../assets/images/categories/dairy.png') },
  { id: '4', name: 'Meat', image: require('../../assets/images/categories/meat.png') },
  {
    id: '5',
    name: 'Beverages',
    image: require('../../assets/images/categories/beverages.png'),
  },
];

const exclusiveOffers = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 4.99,
    unit: 'kg',
    discount: 20,
    image: require('../../assets/images/banana.png'),
  },
  {
    id: '2',
    name: 'Red Apple',
    price: 1.99,
    unit: 'kg',
    discount: 10,
    image: require('../../assets/images/apple.png'),
  },
];

const bestSelling = [
  {
    id: '3',
    name: 'Bell Pepper Red',
    price: 1.99,
    unit: 'kg',
    image: require('../../assets/images/pepper.png'),
  },
  {
    id: '4',
    name: 'Ginger',
    price: 2.99,
    unit: 'kg',
    image: require('../../assets/images/ginger.png'),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProducts', { category });
  };

  const handleAddToCart = (product) => {
    // Add to cart logic would be implemented here
    console.log('Adding to cart:', product.name);
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      showsVerticalScrollIndicator={false}
    >
      {/* Location Header */}
      <View style={tw`flex-row items-center justify-center mt-12 mb-5`}>
        <Image
          source={require('../../assets/icons/location.png')}
          style={tw`w-4 h-4 mr-2`}
        />
        <Text style={tw`text-lg font-medium text-textPrimary`}>
          Coimbatore, Tamil Nadu
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={tw`flex-row items-center bg-secondary rounded-xl mx-5 px-4 mb-5`}
      >
        <Image
          source={require('../../assets/icons/search.png')}
          style={tw`w-5 h-5 mr-2`}
        />
        <TextInput
          style={tw`flex-1 h-11 text-base`}
          placeholder='Search groceries'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Banner */}
      <View style={tw`mx-5 mb-6 rounded-xl overflow-hidden`}>
        <Image
          source={require('../../assets/images/banner.png')}
          style={tw`w-full h-28`}
          resizeMode='cover'
        />
      </View>

      {/* Categories */}
      <SectionHeader title='Categories' />
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => handleCategoryPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pl-5 mb-6`}
      />

      {/* Exclusive Offers */}
      <SectionHeader
        title='Exclusive Offers'
        onSeeAllPress={() =>
          navigation.navigate('SeeAll', { title: 'Exclusive Offers' })
        }
      />
      <FlatList
        data={exclusiveOffers}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pl-5 mb-6`}
      />

      {/* Best Selling */}
      <SectionHeader
        title='Best Selling'
        onSeeAllPress={() =>
          navigation.navigate('SeeAll', { title: 'Best Selling' })
        }
      />
      <FlatList
        data={bestSelling}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pl-5 mb-6`}
      />

      <View style={tw`h-20`} />
    </ScrollView>
  );
};

export default HomeScreen;
