import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import ProductCard from '../../components/ProductCard';

// Mock categories data
const allCategories = [
  { id: '1', name: 'Fruits', icon: require('../../assets/icons/fruits.png') },
  {
    id: '2',
    name: 'Vegetables',
    icon: require('../../assets/icons/vegetables.png'),
  },
  { id: '3', name: 'Dairy', icon: require('../../assets/icons/dairy.png') },
  { id: '4', name: 'Meat', icon: require('../../assets/icons/meat.png') },
  {
    id: '5',
    name: 'Beverages',
    icon: require('../../assets/icons/beverages.png'),
  },
  { id: '6', name: 'Snacks', icon: require('../../assets/icons/snacks.png') },
  { id: '7', name: 'Bakery', icon: require('../../assets/icons/bakery.png') },
  { id: '8', name: 'Frozen', icon: require('../../assets/icons/frozen.png') },
];

// Mock products data
const allProducts = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 4.99,
    unit: 'kg',
    category: '1',
    image: require('../../assets/images/banana.png'),
  },
  {
    id: '2',
    name: 'Red Apple',
    price: 1.99,
    unit: 'kg',
    category: '1',
    image: require('../../assets/images/apple.png'),
  },
  {
    id: '3',
    name: 'Bell Pepper Red',
    price: 1.99,
    unit: 'kg',
    category: '2',
    image: require('../../assets/images/pepper.png'),
  },
  {
    id: '4',
    name: 'Ginger',
    price: 2.99,
    unit: 'kg',
    category: '2',
    image: require('../../assets/images/ginger.png'),
  },
];

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('default'); // default, price-asc, price-desc
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = (product) => {
    // Add to cart logic would go here
    console.log('Adding to cart:', product.name);
  };

  const filteredProducts = allProducts.filter((product) => {
    // Filter by search query
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    // Filter by price range
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    return 0; // default - no sorting
  });

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-5`}>
        <Text style={tw`text-xl font-bold text-textPrimary mb-5`}>
          Find Products
        </Text>

        {/* Search Bar */}
        <View style={tw`flex-row mb-5`}>
          <View
            style={tw`flex-row flex-1 items-center bg-secondary rounded-xl px-4`}
          >
            <Image
              source={require('../../assets/icons/search.png')}
              style={tw`w-5 h-5 mr-2`}
            />
            <TextInput
              style={tw`flex-1 h-11 text-base`}
              placeholder='Search products'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity
            style={tw`ml-3 w-11 h-11 bg-secondary rounded-xl justify-center items-center`}
            onPress={() => setShowFilterModal(true)}
          >
            <Image
              source={require('../../assets/icons/filter.png')}
              style={tw`w-5 h-5`}
            />
          </TouchableOpacity>
        </View>

        {/* Categories Horizontal Scroll */}
        <FlatList
          data={allCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`items-center mr-5 ${selectedCategory === item.id ? 'opacity-100' : 'opacity-50'}`}
              onPress={() => handleCategorySelect(item)}
            >
              <View
                style={tw`w-16 h-16 rounded-full mb-2 bg-secondary justify-center items-center ${selectedCategory === item.id ? 'bg-primary bg-opacity-20' : ''}`}
              >
                <Image
                  source={item.icon}
                  style={tw`w-8 h-8`}
                  resizeMode='contain'
                />
              </View>
              <Text style={tw`text-sm text-textPrimary`}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={tw`pb-5`}
        />
      </View>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center p-5`}>
          <Image
            source={require('../../assets/images/no-results.png')}
            style={tw`w-32 h-32 mb-4`}
            resizeMode='contain'
          />
          <Text style={tw`text-lg font-bold text-textPrimary mb-2`}>
            No products found
          </Text>
          <Text style={tw`text-base text-textSecondary text-center`}>
            Try adjusting your search or filters to find what you're looking
            for.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tw`w-1/2 p-2`}>
              <ProductCard
                product={item}
                onPress={() => handleProductPress(item)}
                onAddToCart={() => handleAddToCart(item)}
              />
            </View>
          )}
          contentContainerStyle={tw`p-3`}
        />
      )}

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl p-5`}>
            <View style={tw`flex-row justify-between items-center mb-5`}>
              <Text style={tw`text-xl font-bold text-textPrimary`}>
                Filters
              </Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Image
                  source={require('../../assets/icons/close.png')}
                  style={tw`w-6 h-6`}
                />
              </TouchableOpacity>
            </View>

            {/* Sort By */}
            <Text style={tw`text-lg font-bold text-textPrimary mb-3`}>
              Sort By
            </Text>
            <View style={tw`mb-5`}>
              <TouchableOpacity
                style={tw`flex-row items-center py-3`}
                onPress={() => setSortBy('default')}
              >
                <View
                  style={tw`w-6 h-6 rounded-full border-2 border-primary justify-center items-center mr-3`}
                >
                  {sortBy === 'default' && (
                    <View style={tw`w-4 h-4 rounded-full bg-primary`} />
                  )}
                </View>
                <Text style={tw`text-base text-textPrimary`}>Default</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center py-3`}
                onPress={() => setSortBy('price-asc')}
              >
                <View
                  style={tw`w-6 h-6 rounded-full border-2 border-primary justify-center items-center mr-3`}
                >
                  {sortBy === 'price-asc' && (
                    <View style={tw`w-4 h-4 rounded-full bg-primary`} />
                  )}
                </View>
                <Text style={tw`text-base text-textPrimary`}>
                  Price: Low to High
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center py-3`}
                onPress={() => setSortBy('price-desc')}
              >
                <View
                  style={tw`w-6 h-6 rounded-full border-2 border-primary justify-center items-center mr-3`}
                >
                  {sortBy === 'price-desc' && (
                    <View style={tw`w-4 h-4 rounded-full bg-primary`} />
                  )}
                </View>
                <Text style={tw`text-base text-textPrimary`}>
                  Price: High to Low
                </Text>
              </TouchableOpacity>
            </View>

            {/* Price Range */}
            <Text style={tw`text-lg font-bold text-textPrimary mb-3`}>
              Price Range
            </Text>
            <View style={tw`flex-row justify-between mb-5`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-base text-textSecondary mr-2`}>₹</Text>
                <TextInput
                  style={tw`w-20 border border-border rounded-lg p-2 text-base text-textPrimary`}
                  keyboardType='numeric'
                  value={priceRange.min.toString()}
                  onChangeText={(text) =>
                    setPriceRange({ ...priceRange, min: parseFloat(text) || 0 })
                  }
                />
              </View>

              <Text style={tw`text-base text-textSecondary mx-3`}>to</Text>

              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-base text-textSecondary mr-2`}>₹</Text>
                <TextInput
                  style={tw`w-20 border border-border rounded-lg p-2 text-base text-textPrimary`}
                  keyboardType='numeric'
                  value={priceRange.max.toString()}
                  onChangeText={(text) =>
                    setPriceRange({ ...priceRange, max: parseFloat(text) || 0 })
                  }
                />
              </View>
            </View>

            {/* Action buttons */}
            <View style={tw`flex-row mt-5`}>
              <TouchableOpacity
                style={tw`flex-1 py-4 border border-primary rounded-xl mr-3 items-center`}
                onPress={() => {
                  setSortBy('default');
                  setPriceRange({ min: 0, max: 100 });
                  setSelectedCategory(null);
                }}
              >
                <Text style={tw`text-base font-bold text-primary`}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-1 py-4 bg-primary rounded-xl items-center`}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={tw`text-base font-bold text-white`}>
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ExploreScreen;
