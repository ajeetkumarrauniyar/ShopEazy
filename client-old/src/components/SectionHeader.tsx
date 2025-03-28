import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface SectionHeaderProps {
  title: string;
  onSeeAllPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onSeeAllPress,
}) => {
  return (
    <View style={tw`flex-row justify-between items-center mx-5 mb-4`}>
      <Text style={tw`text-2xl font-bold text-textPrimary`}>{title}</Text>
      {onSeeAllPress && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={tw`text-base text-primary`}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
