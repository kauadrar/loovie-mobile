import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginRight: 12,
    paddingRight: 4,
    width: rt.screen.width - 68,
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
    color: theme.colors.white,
    paddingLeft: 6,
  },
  autocomplete: {
    position: 'absolute',
    width: rt.screen.width,
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
      android: `${theme.colors.background}F4`,
      ios: `${theme.colors.background}DD`,
    }),
  },
  autocompleteItem: {
    height: 25,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
}));
