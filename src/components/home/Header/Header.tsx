import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderLeft } from '../HeaderLeft/HeaderLeft';
import { HeaderRight } from '../HeaderRight/HeaderRight';

export function Header() {
  return (
    <SafeAreaView style={styles.header} edges={['top']}>
      <HeaderLeft />
      <HeaderRight />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
});
