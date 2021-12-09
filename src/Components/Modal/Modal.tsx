import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import closeButton from '../../../public/Close-Button.svg';
import styles from './Modal.module.scss';

export interface ModalProps {
  isShown: boolean;
  show: (val: boolean) => void;
  modalClass?: string;
}

export const Modal: FC<ModalProps> = ({ isShown, show, children, modalClass }) => {
  if (!isShown) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      <div className={`${styles.modal} ${modalClass? modalClass : ''}`}>
        <div className={styles['modal-content']}>
          <img
            className={styles['modal-close-btn']}
            src={closeButton}
            onClick={() => show(false)}
            aria-label='close'
          />
          <div className={styles['modal-body']}>
            {children}
          </div>
        </div>
      </div>,
      document.getElementById('__next') as Element
    ));
};