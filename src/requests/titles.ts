import { api } from '@/services';
import { Title } from '@/types';

export const getTitlesRequest = async (query: string) => {
  const { data } = await api.get<Title[]>('/titles', {
    params: {
      query,
      page: 1,
      per_page: 10,
    },
  });

  return data;
};

export const getTitlesAutocompleteRequest = async (query: string) => {
  const { data } = await api.get<string[]>('/titles/autocomplete', {
    params: {
      query,
    },
  });

  return data;
};
