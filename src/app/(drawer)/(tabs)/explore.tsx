import { TitleCard } from '@/components/titles';
import { useExplore } from '@/contexts';
import { getTitlesRequest } from '@/requests/titles';
import { Title } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

function ItemSeparatorComponent() {
  return <View style={styles.separator} />;
}

export default function Explore() {
  const { debouncedQuery } = useExplore();
  const { data: titles } = useQuery({
    queryKey: ['titles', debouncedQuery],
    queryFn: async () => await getTitlesRequest(debouncedQuery),
  });

  const renderItem: ListRenderItem<Title> = useCallback(
    ({ item }) => <TitleCard name={item.name} posterPath={item.poster_path} />,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={titles || []}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        numColumns={3}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
});
