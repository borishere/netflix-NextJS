import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { moviesApi } from '../services/movies';
import moviesReducer from './moviesSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [moviesApi.reducerPath]: moviesApi.reducer,
      movies: moviesReducer
    },
    middleware: (gDM) => gDM().concat(moviesApi.middleware)
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
