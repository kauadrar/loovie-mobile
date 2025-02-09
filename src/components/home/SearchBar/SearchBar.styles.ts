import { colors } from '@/styles';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width: WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginRight: 12,
    paddingRight: 4,
    width: WIDTH - 68,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginLeft: 6,
    height: 42,
    flex: 1,
  },
  searchInput: {
    height: 40,
    display: 'none',
    flex: 1,
    color: colors.white,
    paddingLeft: 6,
  },
  autocomplete: {
    position: 'absolute',
    width: WIDTH,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  autocompleteBlur: {
    paddingBottom: 14,
    paddingTop: 8,
    overflow: 'hidden',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: Platform.select({
      android: `${colors.background}F4`,
      ios: `${colors.background}DD`,
    }),
  },
  autocompleteItem: {
    height: 25,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
});
