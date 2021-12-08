import React from 'react';
import { screen, customRender, waitFor } from '../../common/test-utils';
import { DeleteMovieModal } from '../DeleteMovieModal/DeleteMovieModal';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('DeleteMovieModal', () => {
  test('is visible', () => {
    const { asFragment } = customRender(
      <DeleteMovieModal
        isShown={true}
        show={jest.fn()}
        movieId={1}
      />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('DELETE MOVIE')).toBeInTheDocument();
  });

  test('is hidden', () => {
    customRender(
      <DeleteMovieModal
        isShown={false}
        show={jest.fn()}
        movieId={1}
      />
    );

    expect(screen.queryByText('DELETE MOVIE')).not.toBeInTheDocument();
  });

  test('Close on submit', async () => {
    const mockShow = jest.fn();

    customRender(
      <DeleteMovieModal
        isShown={true}
        show={mockShow}
        movieId={1}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(mockShow).toHaveBeenCalledTimes(1);
    });
  });
});