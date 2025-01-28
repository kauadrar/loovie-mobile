import { Text } from '@/components/shared';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TmdbImageUrl } from '@/constants';
import { TitleCardProps } from './TitleCard.types';

const { width: WIDTH } = Dimensions.get('window');

const width = Math.floor((WIDTH - 64) / 3);

export function TitleCard({ name, posterPath }: TitleCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: `${TmdbImageUrl.W342}${posterPath}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width,
    marginHorizontal: 8,
    gap: 6,
  },
  image: {
    height: width * 1.5,
    width: '100%',
    borderRadius: 8,
  },
  name: {
    width: '100%',
    fontSize: 14,
    textAlign: 'center',
  },
});
