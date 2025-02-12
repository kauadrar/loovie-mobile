import { colors } from '@/styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { MenuIcon } from 'lucide-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function DrawerToggleButton({ className }: TouchableOpacityProps) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      className={`p-4 ${className}`}
    >
      <MenuIcon size={24} color={colors.gray1} />
    </TouchableOpacity>
  );
}
