import React, { FC } from 'react';
import { useCachedMovies } from '../../Hooks/hooks';
import { Igenre } from '../../Models/models';
import { Filter } from '../Filter/Filter';
import { MoviesList } from '../MoviesList/MoviesList';
import { Sorting } from '../Sorting/Sorting';
import styles from './Body.module.scss';

export const genresList: Igenre[] = [
  { name: 'all', active: true },
  { name: 'documentary', active: false },
  { name: 'comedy', active: false },
  { name: 'horror', active: false },
  { name: 'crime', active: false }
];

export const Body: FC = () => {
  const { movies } = useCachedMovies();

  return (
    <div className={styles['body']}>
      <div className={styles['filters-wrap']}>
        <Filter genresList={genresList} />
        <Sorting />
      </div>
      <div className={styles['movies-found-label']}>
        {`${movies?.length} movies found`}
      </div>
      <MoviesList />
    </div>
  );
};