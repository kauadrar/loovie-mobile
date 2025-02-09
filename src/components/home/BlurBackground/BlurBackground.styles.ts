import { colors } from '@/styles';
import { Dimensions, StyleSheet } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    position: 'absolute',
    width: WIDTH,
    backgroundColor: `${colors.background}44`,
  },
  touchableArea: {
    height: HEIGHT,
  },
});
