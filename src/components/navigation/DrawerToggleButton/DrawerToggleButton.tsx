import { unistyleIcon } from '@/utils';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Menu } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { styles } from './DrawerToggleButton.styles';

const UniMenu = unistyleIcon(Menu);

export function DrawerToggleButton() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.button}
    >
      <UniMenu size={24} />
    </TouchableOpacity>
  );
}
