import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { store } from './app/store';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='search'>
              <Route path=':searchQuery' />
            </Route>
          </Route>
          <Route
            path='*'
            element={<p>404 not found</p>}
          />
        </Routes>
      </StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
