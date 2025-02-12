import { FontVariant } from '@/types';
import { StyleSheet } from 'react-native-unistyles';

const fontFamily: FontVariant = 'Urbanist-Regular';

export const styles = StyleSheet.create((theme) => ({
  inputArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    padding: 16,
    gap: 10,
    backgroundColor: theme.colors.background,
  },
  full: {
    flex: 1,
  },
  input: {
    flex: 1,
    color: theme.colors.white,
    fontSize: 16,
    fontFamily,
    letterSpacing: 0.5,
  },
  date: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily,
  },
  iconArea: {
    width: 24,
  },
}));
