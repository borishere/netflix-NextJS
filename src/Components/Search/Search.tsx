import { useRouter } from 'next/router';
import React from 'react';
import { KeyboardEvent, useEffect, useState } from 'react';
import styles from './Search.module.scss';

export const SearchForm = () => {
  const [value, setValue] = useState<string>('');
  const router = useRouter();

  const searchParam = router.query.title?.[0] as string;

  useEffect(() => {
    if (searchParam) {
      setValue(searchParam);
    }
  }, [searchParam]);

  const searchHandler = () => {
    router.push(`search/${value}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <div className={styles['search-wrap']}>
      <div className={styles['search-title']}>FIND YOUR MOVIE</div>
      <div className={styles['search-el']}>
        <input
          className={styles['search-input']}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='What do you want to watch?'
          onKeyDown={(e) => onKeyDown(e)}
        />
        <button
          className={styles['search-btn']}
          onClick={searchHandler}
          aria-label='search'
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};
