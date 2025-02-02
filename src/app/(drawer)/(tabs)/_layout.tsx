import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { Bell, House, Popcorn, User } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoovieLogo } from '@/components/svgs';
import { TabButton } from '@/components/tabs';
import { StyleSheet } from 'react-native';

export default function MainLayout() {
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.tabBar, { paddingBottom: bottomInset + 4 }]}>
        <TabTrigger name="home" href="/" asChild>
          <TabButton Icon={House} />
        </TabTrigger>
        <TabTrigger name="cinema" href="/cinema" asChild>
          <TabButton Icon={Popcorn} />
        </TabTrigger>
        <TabTrigger name="recommendations" href="/recommendations" asChild>
          <TabButton Icon={LoovieLogo} rounded />
        </TabTrigger>
        <TabTrigger name="notifications" href="/notifications" asChild>
          <TabButton Icon={Bell} />
        </TabTrigger>
        <TabTrigger name="my_profile" href="/my_profile" asChild>
          <TabButton Icon={User} />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});
