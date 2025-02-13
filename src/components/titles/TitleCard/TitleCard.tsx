import { TmdbImageUrl } from '@/constants';
import { Image } from 'expo-image';

import { Text } from '@/components/shared';
import { cssInterop } from 'nativewind';
import { TouchableOpacity, View } from 'react-native';
import { TitleCardProps } from './TitleCard.types';

const StyledImage = cssInterop(Image, {
  className: 'style',
});

export function TitleCard({ name, posterPath }: TitleCardProps) {
  return (
    <View className="items-center w-1/3 px-2 gap-2">
      <TouchableOpacity className="flex-row">
        <StyledImage
          contentFit="cover"
          source={{ uri: `${TmdbImageUrl.W342}${posterPath}` }}
          className="flex-1 h-auto aspect-[2/3] rounded-lg"
        />
      </TouchableOpacity>
      <Text className="w-full text-sm text-center" numberOfLines={2}>
        {name}
      </Text>
    </View>
  );
}
