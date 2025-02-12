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
  input: {
    color: theme.colors.white,
    flex: 1,
    fontSize: 16,
    fontFamily,
  },
  iconArea: {
    width: 24,
  },
}));
