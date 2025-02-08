import { colors } from '@/styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { MenuIcon } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { styles } from './DrawerToggleButton.styles';

export function DrawerToggleButton() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.button}
    >
      <MenuIcon size={24} color={colors.gray1} />
    </TouchableOpacity>
  );
}
