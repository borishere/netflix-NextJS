import React, { FC } from 'react';
import { useCachedMovies } from '../../Hooks/hooks';
import { MovieCard } from '../MovieCard/MovieCard';
import styles from './MoviesList.module.scss';

interface Props {
}

export const MoviesList: FC<Props> = () => {
  const { movies } = useCachedMovies();

  return (
    <ul className={styles['movies-list']}>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </ul>
  );
};