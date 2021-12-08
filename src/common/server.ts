import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_API_URL } from './utils';
import mockData from './__mocks__/movies.json';

let movies: any[] = Array.from(mockData);

export const server = setupServer(
  rest.get(`${BASE_API_URL}movies`, (req, res, ctx) => {
    return res(ctx.json(movies.slice(0, 2)));
  }),

  rest.get(`${BASE_API_URL}movies:id`, (req, res, ctx) => {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);

    return res(ctx.json(movie));
  }),

  rest.post(`${BASE_API_URL}movies`, (req, res, ctx) => {
    movies.push(req.body);

    return res(ctx.status(200));
  }),

  rest.put(`${BASE_API_URL}movies`, (req, res, ctx) => {
    const requestMovie: any = req.body;

    const movieIndex = movies.findIndex((m) => m.id === requestMovie.id);

    if (movieIndex < 0) {
      return res(ctx.status(404));
    }

    movies[movieIndex] = requestMovie;

    return res(ctx.status(200));
  }),

  rest.delete(`${BASE_API_URL}movies/:id`, (req, res, ctx) => {
    const { id } = req.params;

    movies = movies.filter((m) => m.id !== id);

    return res(ctx.status(200));
  })
);
