import React, { FC } from 'react';
import { Logo } from '../Logo/Logo';
import styles from './Footer.module.scss';

export const Footer: FC = () => (
  <div className={styles.footer}>
    <Logo />
  </div>
);