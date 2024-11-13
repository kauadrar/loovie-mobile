import { colors } from '@/styles';
import { FontVariant } from '@/types';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { SignOut } from 'phosphor-react-native';

const fontFamily: FontVariant = 'Urbanist-Regular';

export function Menu({
  descriptors,
  navigation,
  state,
}: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList
        navigation={navigation}
        state={state}
        descriptors={descriptors}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{
          marginHorizontal: -24,
          fontFamily,
          color: colors.primary,
        }}
        icon={({ size }) => <SignOut size={size} color={colors.primary} />}
        onPress={() => {}}
      />
    </DrawerContentScrollView>
  );
}
