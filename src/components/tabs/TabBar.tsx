import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { TabBarItem } from './TabBarItem';

export function TabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  return (
    <View className="flex-row justify-around items-center bg-background pb-safe-offset-2 h-36">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = index === state.index;

        const icon = options.tabBarIcon?.({
          focused,
          color: focused
            ? options.tabBarActiveTintColor!
            : options.tabBarInactiveTintColor!,
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarItem
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            icon={icon}
            label={options.title}
            focused={focused}
          />
        );
      })}
    </View>
  );
}
