import { FontVariant } from '@/types';
import { StyleSheet } from 'react-native-unistyles';

const fontFamily: FontVariant = 'Urbanist-Regular';

export const styles = StyleSheet.create((theme) => ({
  inputContainer: {
    width: '100%',
    gap: 2,
  },
  inputArea: {
    zIndex: 1,
  },
  errorMessage: {
    fontSize: 14,
    color: theme.colors.danger,
  },
  occultedErrorMessage: {
    position: 'absolute',
    top: 0,
  },
  label: {
    color: theme.colors.gray1,
    fontSize: 16,
    fontFamily,
    height: 22,
    marginLeft: 6,
  },
}));
