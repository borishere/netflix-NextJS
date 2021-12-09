import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../Hooks/hooks';
import { Igenre } from '../../Models/models';
import { setFilter } from '../../app/moviesSlice';
import { addParamToExistsSearchParams, deleteParamFromExistsSearchParams } from '../../common/utils';
import { useRouter } from 'next/router';
import styles from './Filter.module.scss';

interface Props {
  genresList: Igenre[];
}

export const Filter: FC<Props> = ({ genresList }) => {
  const [genres, setGenres] = useState<Igenre[]>(genresList);

  const { query, push } = useRouter();
  const dispatch = useAppDispatch();

  const genreQuery = query.genre as string;

  const genreClickHandler = useCallback((name: string): void => {
    const updatedGenres = genres.map((genre) => {
      genre.active = genre.name === name;

      return genre;
    });

    setGenres([...updatedGenres]);

    let params: URLSearchParams;

    if (name === 'all') {
      params = deleteParamFromExistsSearchParams('genre');
    } else {
      params = addParamToExistsSearchParams('genre', name);
    }

    push({ search: params.toString() });
  }, [push]);

  useEffect(() => {
    const preparedGenres = genres
      .filter((genre) => genre.active)
      .map((genre) => genre.name);

    dispatch(setFilter(preparedGenres));
  }, [genres, dispatch]);

  useEffect(() => {
    if (genreQuery) {
      const updatedGenres = genres.map((genre) => {
        genre.active = genre.name === genreQuery;

        return genre;
      });

      setGenres([...updatedGenres]);
    }
  }, [genreQuery, genreClickHandler]);

  return (
    <ul className={styles['filter-wrap']}>
      {genres.map((genre) => (
        <li
          key={genre.name}
          className={`${styles['filter-item']} ${genre.active ? styles.active : ''}`}
          onClick={() => genreClickHandler(genre.name)}
        >
          {genre.name.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};
