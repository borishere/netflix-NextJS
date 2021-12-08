import React from 'react';
import { screen, customRender, waitFor } from '../../common/test-utils';
import { EditMovieModal } from '../EditMovieModal/EditMovieModal';
import { Imovie } from '../../Models/models';
import '@testing-library/jest-dom';

describe('EditMovieModal', () => {
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

  test('is visible', () => {
    const { asFragment } = customRender(
      <EditMovieModal
        isShown={true}
        show={jest.fn()}
        movie={movie}
        updateMovie={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('EDIT MOVIE')).toBeInTheDocument();
  });

  test('is hidden', () => {
    customRender(
      <EditMovieModal
        isShown={false}
        show={jest.fn()}
        movie={movie}
        updateMovie={jest.fn()}
      />
    );

    expect(screen.queryByText('EDIT MOVIE')).not.toBeInTheDocument();
  });

  test('Renders movie values', async () => {
    customRender(
      <EditMovieModal
        isShown={true}
        show={jest.fn()}
        movie={movie}
        updateMovie={jest.fn()}
      />
    );

    const titleInput = screen.getByLabelText('title-input');
    const overviewInput = screen.getByLabelText('overview-input');
    const ratingInput = screen.getByLabelText('rating-input');
    const runtimeInput = screen.getByLabelText('runtime-input');
    const dateInput = screen.getByLabelText('date-input');
    const urlInput = screen.getByLabelText('url-input');

    await waitFor(() => {
      expect(titleInput).toHaveValue(movie.title);
      expect(overviewInput).toHaveValue(movie.overview);
      expect(ratingInput).toHaveValue(movie.vote_average);
      expect(runtimeInput).toHaveValue(movie.runtime);
      expect(dateInput).toHaveValue(movie.release_date);
      expect(urlInput).toHaveValue(movie.poster_path);
    });
  });
});