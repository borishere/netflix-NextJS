import React, { FC } from 'react';
import styles from './Logo.module.scss';

export const Logo: FC = () => {
  return (
    <div className={styles['logo-wrap']}>
      <span className={styles['logo-left']}>netflix</span>
      <span className={styles['logo-right']}>roulette</span>
    </div>
  );
};