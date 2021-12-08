import React from 'react';
import { screen, customRender } from '../../common/test-utils';
import { AddMovieModal } from '../AddMovieModal/AddMovieModal';
import '@testing-library/jest-dom';

describe('AddMovieModal', () => {
  test('is visible', () => {
    const { asFragment } = customRender(
      <AddMovieModal
        isShown={true}
        show={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('ADD MOVIE')).toBeInTheDocument();
  });

  test('is hidden', () => {
    customRender(
      <AddMovieModal
        isShown={false}
        show={jest.fn()}
      />
    );

    expect(screen.queryByText('ADD MOVIE')).not.toBeInTheDocument();
  });
});