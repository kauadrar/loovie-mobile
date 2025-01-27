import { TitleCard } from '@/components/titles';
import { useExplore } from '@/contexts';
import { colors } from '@/styles';
import { Title } from '@/types';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';

function ItemSeparatorComponent() {
  return <View style={styles.separator} />;
}

function ListEmpty() {
  return (
    <View>
      <ActivityIndicator size="large" color={colors.gray1} />
    </View>
  );
}

export default function Explore() {
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
