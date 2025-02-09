import { SearchBar } from '@/components/home';
import { Container, Loading } from '@/components/shared';
import { TitleCard } from '@/components/titles';
import { useExplore } from '@/contexts';
import { Title } from '@/types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

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
  const { titles, isLoadingTitles, setIsExploring, setQuery } = useExplore();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();

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
    <Container style={styles.container} headerRight={() => <SearchBar />}>
      <FlatList
        data={titles || []}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        numColumns={3}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={isLoadingTitles ? ListEmpty : null}
        contentContainerStyle={{
          paddingTop: headerHeight + 8,
          paddingBottom: bottomTabBarHeight + 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  separator: {
    height: 16,
  },
  listEmpty: {
    alignItems: 'center',
    marginTop: 16,
  },
});
