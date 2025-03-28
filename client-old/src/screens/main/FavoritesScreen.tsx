import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Button from '../../components/Button';

// Mock favorites data
const initialFavorites = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 4.99,
    unit: 'kg',
    image: require('../assets/images/favorites/banana.png'),
  },
  {
    id: '2',
    name: 'Red Apple',
    price: 1.99,
    unit: 'kg',
    image: require('../../assets/images/apple.png'),
  },
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

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = (product) => {
    // Add to cart logic would go here
    console.log('Adding to cart:', product.name);
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={tw`w-full flex-row p-4 border-b border-border`}>
      <TouchableOpacity 
        style={tw`flex-row flex-1`}
        onPress={() => handleProductPress(item)}
      >
        <Image
          source={item.image}
          style={tw`w-20 h-20`}
          resizeMode="contain"
        />
        
        <View style={tw`ml-4 justify-center`}>
          <Text style={tw`text-base font-bold text-textPrimary mb-1`}>{item.name}</Text>
          <Text style={tw`text-sm text-textSecondary mb-1`}>{item.unit}</Text>
          <Text style={tw`text-base font-bold text-textPrimary`}>₹{item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={tw`justify-center items-end`}>
        <TouchableOpacity
          style={tw`w-10 h-10 rounded-xl bg-primary justify-center items-center mb-2`}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={tw`text-white text-xl font-bold`}>+</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleRemoveFromFavorites(item.id)}
        >
          <Image
            source={require('../../assets/icons/trash.png')}
            style={tw`w-5 h-5`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row justify-center items-center p-5 border-b border-border`}>
        <Text style={tw`text-xl font-bold text-textPrimary`}>Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center p-10`}>
          <Image
            source={require('../../assets/images/empty-favorites.png')}
            style={tw`w-40 h-40 mb-5`}
            resizeMode="contain"
          />
          <Text style={tw`text-lg font-bold text-textPrimary mb-2`}>No favorites yet</Text>
          <Text style={tw`text-base text-textSecondary text-center mb-5`}>
            Tap the heart icon on products to add them to your favorites.
          </Text>
          <Button 
            title="Browse Products" 
            onPress={() => navigation.navigate('Home')}
            size="sm"
            fullWidth={false}
          />
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item.id}
          contentContainerStyle={favorites.length === 0 ? tw`flex-1 justify-center items-center` : null}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;
