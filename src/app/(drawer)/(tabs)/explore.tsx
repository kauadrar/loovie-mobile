import { Loading } from '@/components/shared';
import { TitleCard } from '@/components/titles';
import { useExplore } from '@/contexts';
import { Title } from '@/types';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ItemSeparatorComponent() {
  return <View style={styles.separator} />;
}

function ListEmpty() {
  return (
    <View style={styles.listEmpty}>
      <Loading />
    </View>
  );
}

export default function Explore() {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { titles, setIsExploring, isLoadingTitles } = useExplore();
  const navigation = useNavigation();

  const renderItem: ListRenderItem<Title> = useCallback(
    ({ item }) => <TitleCard name={item.name} posterPath={item.poster_path} />,
    [],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setIsExploring(true);
    });

    return unsubscribe;
  }, [navigation, setIsExploring]);

  return (
    <View style={styles.container}>
      <FlatList
        data={titles || []}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        numColumns={3}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={isLoadingTitles ? ListEmpty : null}
        contentContainerStyle={{ paddingBottom: 16 + bottomInset }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  separator: {
    height: 16,
  },
  listEmpty: {
    alignItems: 'center',
    marginTop: 16,
  },
});
