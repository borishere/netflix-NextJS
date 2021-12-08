import React, { FC, useContext } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import { Imovie } from '../../Models/models';
import './style.scss';

interface Props {
  movie?: Imovie;
  setShow: (val: boolean) => void;
}

export const ContextMenu: FC<Props> = ({ setShow }) => {
  const context = useContext(ModalContext);

  return (
    <div className='context-menu'>
      <div
        className='context-menu-close-btn'
        onClick={() => setShow(false)}
        aria-label='close-btn'
      >
        x
      </div>
      <div
        className='context-menu-item'
        onClick={() => context.setShowEditMovieModal(true)}
      >
        Edit
      </div>
      <div
        className='context-menu-item'
        onClick={() => context.setShowDeleteMovieModal(true)}
      >
        Delete
      </div>
    </div>
  );
};