import React from 'react';
import { customRender } from '../../common/test-utils';
import { MoviesList } from '../MoviesList/MoviesList';
import '@testing-library/jest-dom';

describe('MoviesList', () => {
  test('Renders', () => {
    const { asFragment } = customRender(
      <MoviesList />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});