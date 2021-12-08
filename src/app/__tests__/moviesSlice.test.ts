import { setFilter, setSortBy } from '../moviesSlice';
import { store } from '../store';

describe('movies reducer', () => {
  test('setFilter', () => {
    store.dispatch(setFilter(['all']));
    let state = store.getState().movies;
    expect(state.filter).toStrictEqual(['']);

    store.dispatch(setFilter(['comedy']));
    state = store.getState().movies;
    expect(state.filter).toStrictEqual(['comedy']);

    store.dispatch(setFilter(['crime, documentary, horror']));
    state = store.getState().movies;
    expect(state.filter).toStrictEqual(['crime, documentary, horror']);
  });

  test('setSortBy', () => {
    store.dispatch(setSortBy('date'));
    let state = store.getState().movies;
    expect(state.sortBy).toStrictEqual('date');

    store.dispatch(setSortBy(''));
    state = store.getState().movies;
    expect(state.sortBy).toStrictEqual('');

    store.dispatch(setSortBy('Title'));
    state = store.getState().movies;
    expect(state.sortBy).toStrictEqual('Title');
  });
});