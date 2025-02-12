import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  list: {
    flex: 0,
    flexGrow: 0,
  },
  listContainer: {
    paddingVertical: 60,
    alignItems: 'flex-start',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: theme.colors.gray1,
    fontSize: 16,
  },
  submitText: {
    color: theme.colors.gray1,
    fontSize: 16,
    position: 'absolute',
    justifyContent: 'center',
    opacity: 0,
  },
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: rt.insets.top,
  },
}));
