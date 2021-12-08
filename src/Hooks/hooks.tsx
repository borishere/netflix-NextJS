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
  const { searchQuery } = useParams();
  const [searchParams] = useSearchParams();
  const genre = searchParams.get('genre');
  const sortBy = searchParams.get('sortBy');

  const queryParams: IGetMoviesArgs = {};

  if (genre) {
    queryParams['filter'] = genre;
  }

  if (sortBy) {
    queryParams['sortBy'] = sortBy;
    queryParams['sortOrder'] = 'asc';
  }

  if (searchQuery) {
    queryParams['search'] = searchQuery;
    queryParams['searchBy'] = 'title';
  }

  const { data: movies } = moviesApi.endpoints.getMovies.useQueryState(queryParams);

  return { movies };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;