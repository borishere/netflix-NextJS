import React from 'react';
import { screen, customRender } from '../../common/test-utils';
import '@testing-library/jest-dom';
import { Imovie } from '../../Models/models';
import { MovieCard } from '../MovieCard/MovieCard';

describe('MovieCard', () => {
  const movie: Imovie = {
    id: 76338,
    title: 'Thor: The Dark World',
    tagline: 'Delve into the darkness',
    vote_average: 6.7,
    vote_count: 6522,
    release_date: '2013-10-29',
    poster_path: 'https://image.tmdb.org/t/p/w500/bnX5PqAdQZRXSw3aX3DutDcdso5.jpg',
    overview: 'Thor fights to restore order across the cosmos… but an ancient race led by the vengeful Malekith returns to plunge the universe back into darkness. Faced with an enemy that even Odin and Asgard cannot withstand, Thor must embark on his most perilous and personal journey yet, one that will reunite him with Jane Foster and force him to sacrifice everything to save us all.',
    budget: 170000000,
    revenue: 644571402,
    genres: [
      'documentary',
      'comedy'
    ],
    runtime: 112
  };

  test('Renders', () => {
    const { asFragment } = customRender(
      <MovieCard movie={movie} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Renders movie values', () => {
    customRender(
      <MovieCard movie={movie} />
    );

    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(movie.release_date as string)).toBeInTheDocument();
  });
});