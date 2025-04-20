import { Container, Loading } from '@/components/shared';
import { TitleCard } from '@/components/titles';
import { useExplore } from '@/contexts';
import { Title } from '@/types';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';

function ItemSeparatorComponent() {
  return <View className="h-4" />;
}

function ListEmpty() {
  return (
    <View className="items-center mt-4">
      <Loading />
    </View>
  );
}

export default function Explore() {
  const { titles, isLoadingTitles, setIsExploring, setQuery } = useExplore();
  const navigation = useNavigation();

  const renderItem: ListRenderItem<Title> = useCallback(
    ({ item }) => <TitleCard name={item.name} posterPath={item.poster_path} />,
    [],
  );

  const resetExplore = useCallback(() => {
    setIsExploring(false);
    setQuery('');
  }, [setIsExploring, setQuery]);

  useEffect(() => {
    const blurUnsubscribe = navigation.addListener('blur', resetExplore);
    const beforeRemoveUnsubscribe = navigation.addListener(
      'beforeRemove',
      resetExplore,
    );

    return () => {
      blurUnsubscribe();
      beforeRemoveUnsubscribe();
    };
  }, [navigation, resetExplore]);

  return (
    <Container className="flex-1 px-2">
      <FlatList
        data={titles || []}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        numColumns={3}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={isLoadingTitles ? ListEmpty : null}
        contentContainerClassName="pt-safe-offset-20 pb-safe-offset-28"
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
