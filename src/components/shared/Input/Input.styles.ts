import { colors } from '@/styles';
import { FontVariant } from '@/types';
import { StyleSheet } from 'react-native';

const fontFamily: FontVariant = 'Urbanist-Regular';

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
  input: {
    color: colors.white,
    flex: 1,
    fontSize: 16,
    fontFamily,
  },
  iconArea: {
    width: 24,
  },
});
