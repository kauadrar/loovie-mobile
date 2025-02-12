import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  button: (style = {}) => ({
    width: '100%',
    borderWidth: 1,
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.gray1,
    padding: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
  }),
  buttonText: {
    color: theme.colors.gray1,
    fontSize: 16,
  },
}));
