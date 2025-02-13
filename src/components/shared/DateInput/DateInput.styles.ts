import { colors } from '@/styles';
import { FontVariant } from '@/types';
import { StyleSheet } from 'react-native';

const fontFamily: FontVariant = 'urbanist-regular';

export const styles = StyleSheet.create({
  inputArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gray2,
    padding: 16,
    gap: 10,
    backgroundColor: colors.background,
  },
  full: {
    flex: 1,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    fontFamily,
    letterSpacing: 0.5,
  },
  date: {
    color: colors.white,
    fontSize: 16,
    fontFamily,
  },
  iconArea: {
    width: 24,
  },
});
