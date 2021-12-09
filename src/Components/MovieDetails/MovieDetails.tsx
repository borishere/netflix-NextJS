import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { deleteParamFromExistsSearchParams } from '../../common/utils';
import searchButton from '../../../public/Search-Button.svg';
import { Imovie } from '../../Models/models';
import { Logo } from '../Logo/Logo';
import styles from './MovieDetails.module.scss';

interface Props {
  selectedMovie: Imovie;
}

export const MovieDetails: FC<Props> = ({ selectedMovie }) => {
  const { push } = useRouter();

  const onSetSearchMode = () => {
    const params = deleteParamFromExistsSearchParams('movie');

    push({ search: params.toString() });
  };

  return (
    <>
      <div className={styles.top}>
        <Logo />
        <img
          className={styles['search-icon']}
          src={searchButton}
          onClick={onSetSearchMode}
        />
      </div>

      <div className={styles['movie-details']}>
        <div className={styles['movie-details-cover']}>
          <img />
        </div>
        <div className={styles['movie-details-info']}>

          <div className={styles['title-rating-wrap']}>
            <h2 className={styles['movie-details-title']}>{selectedMovie?.title}</h2>
            <span className={styles['movie-details-rating']}>{selectedMovie?.vote_average}</span>
          </div>

          <div className={styles['movie-details-genre']}>
            {selectedMovie?.genres?.map((genre, i) => `${genre}${i < selectedMovie.genres.length - 1 ? ', ' : ''}`)}
          </div>

          <div>
            <span className={styles['movie-details-year']}>{selectedMovie?.release_date}</span>
            <span className={styles['movie-details-runtime']}>{`${selectedMovie?.runtime}min`}</span>
          </div>

          <div className={styles['movie-details-description']}>
            {selectedMovie?.overview}
          </div>

        </div>
      </div>
    </>
  );
};