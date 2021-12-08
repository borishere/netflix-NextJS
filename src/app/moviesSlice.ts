import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMoviesState } from '../Models/models';
import { RootState } from './store';

export const initialState: IMoviesState = {
  sortBy: 'vote_count'
};

export const moviesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => ({
      ...state,
      sortBy: action.payload
    }),

    setFilter: (state, action: PayloadAction<string[]>) => ({
      ...state,
      filter: action.payload[0] === 'all' ? [''] : action.payload
    })
  }
});

export const { setSortBy, setFilter } = moviesSlice.actions;

export const selectSortBy = (state: RootState) => state.movies.sortBy;

export default moviesSlice.reducer;