import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ModalContext } from '../Context/ModalContext';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { createMemoryHistory } from 'history';
import { moviesApi } from '../services/movies';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import moviesReducer from '../app/moviesSlice';
import { configureStore } from '@reduxjs/toolkit';

const history = createMemoryHistory();


const AllTheProviders: FC = ({ children }) => {
  return (
    <Router location='/' navigator={history}>
      <Provider store={store}>
        <ModalContext.Provider value={{}}>
          {children}
        </ModalContext.Provider>
      </Provider>
    </Router>
  );
};

function renderWithStore(
  ui: ReactElement,
  {
    store = configureStore({
      reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        movies: moviesReducer

      },
      middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware().concat(moviesApi.middleware)
    }),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: any) {
    const history = createMemoryHistory();

    return (
      <Provider store={store}>
        <Router location='/' navigator={history}>
          {children}
        </Router>
      </Provider>
    );
  }

  store.dispatch(moviesApi.util.resetApiState());

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

const root = document.createElement('div');
root.id = 'root';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, container: document.body.appendChild(root), ...options });

export * from '@testing-library/react';
export { customRender, renderWithStore };