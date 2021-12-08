import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextMenu } from '../ContextMenu/ContextMenu';
// @ts-ignore
import contextIcon from '../../Images/item-context.svg';
import { Imovie } from '../../Models/models';
import { addParamToExistsSearchParams } from '../../common/utils';
import './style.scss';

interface Props {
  movie: Imovie;
}

export const MovieCard: FC<Props> = ({ movie }) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const onMovieSelect = () => {
    const params = addParamToExistsSearchParams('movie', movie.id.toString());

    navigate({ search: params.toString() });
  };

  return (
    <li className='movie-item' onClick={onMovieSelect}>
      <img
        className='context-btn'
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
      <div className='movie-content'>
        <div className='movie-content-base'>
          <h2 className='movie-title'>{movie?.title}</h2>
          <span className='movie-release-date'>{movie?.release_date}</span>
        </div>
        <span className='movie-genres'>{movie?.genres?.map((genre, i) => `${genre}${i < movie.genres.length - 1 ? ', ' : ''}`)}</span>
      </div>
    </li>
  );
};