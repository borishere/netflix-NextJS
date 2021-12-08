import React, { FC, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { initialState } from '../../app/moviesSlice';
import { useAppDispatch } from '../../Hooks/hooks';
import { setSortBy } from '../../app/moviesSlice';
import { addParamToExistsSearchParams } from '../../common/utils';
import './style.scss';

export const Sorting: FC = () => {
  const [value, setValue] = useState<string>(initialState.sortBy);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue(value);

    const params = addParamToExistsSearchParams('sortBy', value);

    navigate({search: params.toString()});
  };

  useEffect(() => {
    dispatch(setSortBy(value));
  }, [value, dispatch]);

  useEffect(() => {
    if (sortBy) {
      setValue(sortBy);
    }
  }, [sortBy]);


  return (
    <div className='sorting'>
      <span className='sorting-title'>SORT BY</span>

      <select
        className='sorting-items'
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
