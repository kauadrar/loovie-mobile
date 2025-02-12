import { Text } from '@/components/shared';
import { TmdbImageUrl } from '@/constants';
import FastImage from '@d11/react-native-fast-image';
import { Dimensions, TouchableOpacity } from 'react-native';
import { TitleCardProps } from './TitleCard.types';

const { width: WIDTH } = Dimensions.get('window');

export function TitleCard({ name, posterPath }: TitleCardProps) {
  const width = Math.floor((WIDTH - 64) / 3);
  const height = width * 1.5;

  return (
    <TouchableOpacity className={`items-center w-[${width}px] mx-2 gap-2`}>
      <FastImage
        source={{ uri: `${TmdbImageUrl.W342}${posterPath}` }}
        className={`h-[${height}px] w-full rounded-lg`}
        resizeMode="cover"
      />
      <Text className="w-full text-sm align-center" numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
