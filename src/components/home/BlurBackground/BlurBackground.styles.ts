import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    height: rt.screen.height,
    position: 'absolute',
    width: rt.screen.width,
    backgroundColor: `${theme.colors.background}44`,
  },
  touchableArea: {
    height: rt.screen.height,
  },
}));
