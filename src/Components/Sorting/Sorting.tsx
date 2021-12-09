import React, { FC, useEffect, useState } from 'react';
import { initialState } from '../../app/moviesSlice';
import { useAppDispatch } from '../../Hooks/hooks';
import { setSortBy } from '../../app/moviesSlice';
import { addParamToExistsSearchParams } from '../../common/utils';
import { useRouter } from 'next/router';
import styles from './Sorting.module.scss';

export const Sorting: FC = () => {
  const [value, setValue] = useState<string>(initialState.sortBy);

  const dispatch = useAppDispatch();
  const { query, push } = useRouter();

  const sortByQuery = query.sortBy as string;

  const onSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue(value);

    const params = addParamToExistsSearchParams('sortBy', value);

    push({ search: params.toString() });
  };

  useEffect(() => {
    dispatch(setSortBy(value));
  }, [value, dispatch]);

  useEffect(() => {
    if (sortByQuery) {
      setValue(sortByQuery);
    }
  }, [sortByQuery]);

  return (
    <div className={styles.sorting}>
      <span className={styles['sorting-title']}>SORT BY</span>

      <select
        className={styles['sorting-items']}
        value={value}
        onChange={onSort}
        aria-label='sorting-select'
      >
        <option value='release_date'>release date</option>
        <option value='vote_count'>rating</option>
        <option value='title'>title</option>
      </select>
    </div>
  );
};
