import React, { FC } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import closeButton from '../../Images/Close-Button.svg';
import './style.scss';

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
      <div className={`modal ${modalClass? modalClass : ''}`}>
        <div className='modal-content'>
          <img
            className='modal-close-btn'
            src={closeButton}
            onClick={() => show(false)}
            aria-label='close'
          />
          <div className='modal-body'>
            {children}
          </div>
        </div>
      </div>,
      document.getElementById('root') as Element
    ));
};