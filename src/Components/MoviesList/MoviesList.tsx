import React, { FC } from 'react';
import { useCachedMovies } from '../../Hooks/hooks';
import { MovieCard } from '../MovieCard/MovieCard';
import './style.scss';

interface Props {
}

export const MoviesList: FC<Props> = () => {
  const { movies } = useCachedMovies();

  return (
    <ul className='movies-list'>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </ul>
  );
};