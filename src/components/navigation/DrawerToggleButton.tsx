import { colors } from '@/styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { PlatformPressable } from '@react-navigation/elements';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { MenuIcon } from 'lucide-react-native';
import { Platform, TouchableOpacityProps, View } from 'react-native';

export function DrawerToggleButton({ className }: TouchableOpacityProps) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View
      className={Platform.select({
        android: 'rounded-full h-12 w-12 right-3 overflow-hidden',
        default: '',
      })}
    >
      <PlatformPressable
        android_ripple={{
          radius: 20,
          foreground: true,
          borderless: true,
        }}
        className={Platform.select({
          android: 'rounded-full h-12 w-12 items-center justify-center',
          default: '',
        })}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <MenuIcon size={22} color={colors.gray1} />
      </PlatformPressable>
    </View>
  );
}
