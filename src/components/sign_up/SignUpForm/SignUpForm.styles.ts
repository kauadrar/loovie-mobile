import { colors } from '@/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  list: {
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
    color: colors.gray1,
    fontSize: 16,
  },
  submitText: {
    position: 'absolute',
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
  },
});
