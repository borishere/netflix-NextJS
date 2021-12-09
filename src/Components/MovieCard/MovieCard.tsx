import React, { FC, useState } from 'react';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import contextIcon from '../../../public/item-context.svg';
import { Imovie } from '../../Models/models';
import { addParamToExistsSearchParams } from '../../common/utils';
import { useRouter } from 'next/router';
import styles from './MovieCard.module.scss';

interface Props {
  movie: Imovie;
}

export const MovieCard: FC<Props> = ({ movie }) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const { push } = useRouter();

  const onMovieSelect = () => {
    const params = addParamToExistsSearchParams('movie', movie.id.toString());

    push({ search: params.toString() });
  };

  return (
    <li className={styles['movie-item']} onClick={onMovieSelect}>
      <img
        className={styles['context-btn']}
        src={contextIcon}
        onClick={() => setShowContextMenu(!showContextMenu)}
      />

      <img src={movie?.poster_path} />

      {showContextMenu && (
        <ContextMenu
          setShow={setShowContextMenu}
          movie={movie}
        />
      )}
      <div className={styles['movie-content']}>
        <div className={styles['movie-content-base']}>
          <h2 className={styles['movie-title']}>{movie?.title}</h2>
          <span className={styles['movie-release-date']}>{movie?.release_date}</span>
        </div>
        <span className={styles['movie-genres']}>{movie?.genres?.map((genre, i) => `${genre}${i < movie.genres.length - 1 ? ', ' : ''}`)}</span>
      </div>
    </li>
  );
};