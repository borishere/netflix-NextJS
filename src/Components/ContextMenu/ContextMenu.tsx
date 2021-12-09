import React, { FC, useContext } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import { Imovie } from '../../Models/models';
import styles from './ContextMenu.module.scss';

interface Props {
  movie?: Imovie;
  setShow: (val: boolean) => void;
}

export const ContextMenu: FC<Props> = ({ setShow }) => {
  const context = useContext(ModalContext);

  return (
    <div className={styles['context-menu']}>
      <div
        className={styles['context-menu-close-btn']}
        onClick={() => setShow(false)}
        aria-label='close-btn'
      >
        x
      </div>
      <div
        className={styles['context-menu-item']}
        onClick={() => context.setShowEditMovieModal(true)}
      >
        Edit
      </div>
      <div
        className={styles['context-menu-item']}
        onClick={() => context.setShowDeleteMovieModal(true)}
      >
        Delete
      </div>
    </div>
  );
};