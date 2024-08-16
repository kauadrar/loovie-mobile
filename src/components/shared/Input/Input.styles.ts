import { colors } from '@/styles';
import { FontVariant } from '@/types';
import { StyleSheet } from 'react-native';

const fontFamily: FontVariant = 'Urbanist-Regular';

export const styles = StyleSheet.create({
  inputContainer: {
    gap: 2,
    width: '100%',
    height: 62,
  },
  inputArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.black,
    padding: 16,
    gap: 10,
    backgroundColor: colors.gray2,
  },
  input: {
    color: colors.white,
    flex: 1,
    fontSize: 16,
    fontFamily,
  },
  iconArea: {
    width: 24,
  },
  errorMessage: {
    fontSize: 14,
    color: '#660708',
    position: 'absolute',
    bottom: -18,
  },
  placeholderArea: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 50,
  },
  placeholder: {
    color: colors.gray1,
    fontSize: 16,
    fontFamily,
  },
  label: {
    color: colors.gray1,
    fontSize: 16,
    fontFamily,
    position: 'absolute',
    zIndex: 1,
    top: -22,
    left: 0,
  },
});
