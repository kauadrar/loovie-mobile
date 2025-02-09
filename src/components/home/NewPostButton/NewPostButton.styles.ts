import { colors } from '@/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainButton: {
    height: 56,
    width: '100%',
    borderRadius: 100,
    backgroundColor: colors.gray2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  backdrop: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    right: 0,
  },
  content: {
    height: 40,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -2,
    flexDirection: 'row',
    gap: 4,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray2,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
    flexDirection: 'row',
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 140,
    right: 20,
    zIndex: 2,
  },
  label: {
    color: '#f8f9ff',
    fontWeight: 500,
  },
});
