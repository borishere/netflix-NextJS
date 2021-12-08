import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import { store } from '../store';
import { App } from '../../App';
import { moviesApi } from '../../services/movies';
import { renderWithStore } from '../../common/test-utils';
import { server } from '../../common/server';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  store.dispatch(moviesApi.util.resetApiState());
});

afterAll(() => server.close());

test('App', async () => {
  renderWithStore(<App />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  expect(await screen.findByText(/No movies/i)).toBeInTheDocument();
});
