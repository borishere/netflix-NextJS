import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { useSearchParams, useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from '../app/store';
import { IGetMoviesArgs } from '../Models/models';
import { moviesApi } from '../services/movies';

export const useTitle = (title: string = '') => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const useCachedMovies = () => {
  const { query: searchQuery } = useRouter();

  const searchParam = searchQuery.title?.[0] as string;
  const genreQuery = searchQuery.genre as string;
  const sortByQuery = searchQuery.sortBy as string;

  const queryParams: IGetMoviesArgs = {};

  if (genreQuery) {
    queryParams['filter'] = genreQuery;
  }
  if (sortByQuery) {
    queryParams['sortBy'] = sortByQuery;
    queryParams['sortOrder'] = 'asc';
  }

  if (searchParam) {
    queryParams['search'] = searchParam;
    queryParams['searchBy'] = 'title';
  }

  const { data: movies } = moviesApi.endpoints.getMovies.useQueryState(queryParams);

  return { movies };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;