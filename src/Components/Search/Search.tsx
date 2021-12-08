import React from 'react';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.scss';

export const SearchForm = () => {
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();

  const { searchQuery } = useParams();

  useEffect(() => {
    if (searchQuery) {
      setValue(searchQuery);
    }
  }, [searchQuery]);

  const searchHandler = () => {
    navigate(`search/${value}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <div className='search-wrap'>
      <div className='search-title'>FIND YOUR MOVIE</div>
      <div className='search-el'>
        <input
          className='search-input'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='What do you want to watch?'
          onKeyDown={(e) => onKeyDown(e)}
        />
        <button
          className='search-btn'
          onClick={searchHandler}
          aria-label='search'
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};
