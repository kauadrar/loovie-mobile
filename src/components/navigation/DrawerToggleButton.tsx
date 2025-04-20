import { colors } from '@/styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { PlatformPressable } from '@react-navigation/elements';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { MenuIcon } from 'lucide-react-native';
import { TouchableOpacityProps } from 'react-native';

export function DrawerToggleButton({ className }: TouchableOpacityProps) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <PlatformPressable
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <MenuIcon size={22} color={colors.gray1} />
    </PlatformPressable>
  );
}
