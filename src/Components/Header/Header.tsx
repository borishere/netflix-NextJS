import React, { FC, useContext } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import { Imovie, TNullableMovie } from '../../Models/models';
import { Logo } from '../Logo/Logo';
import { MovieDetails } from '../MovieDetails/MovieDetails';
import { SearchForm } from '../Search/Search';
import styles from './Header.module.scss';

interface Props {
  onValueChange?: (val: Imovie) => void;
  selectedMovie?: TNullableMovie;
}

export const Header: FC<Props> = ({ selectedMovie }) => {
  const context = useContext(ModalContext);

  return (
    <div className={`${styles.header}${!selectedMovie ? ` ${styles['search-panel']}` : ''}`}>
      {selectedMovie ? <MovieDetails selectedMovie={selectedMovie} /> : (
        <>
          <div className={styles.top}>
            <Logo />
            <button className={styles['add-movie-btn']} onClick={() => context.setShowAddMovieModal(true)}>+ ADD MOVIE</button>
          </div>
          <SearchForm />
        </>
      )}
    </div>
  );
};