import React, { FC } from 'react';
import { useDeleteMovieMutation } from '../../services/movies';
import { Modal, ModalProps } from '../Modal/Modal';
import styles from './DeleteMovieModal.module.scss';

interface Props extends ModalProps {
  movieId: number;
}

export const DeleteMovieModal: FC<Props> = ({ movieId, ...props }) => {
  const [deleteMovie, { isLoading }] = useDeleteMovieMutation();

  const onSubmit = (): void => {
    if (movieId) {
      deleteMovie(movieId).then(() => {
        props.show(false);
      });
    }
  };

  if (!movieId) {
    return null;
  }

  return (
    <Modal modalClass='delete-movie-modal' {...props}>
      <>
        {isLoading && <span>Deleting...</span>}
        <h2 className={styles['modal-title']}>DELETE MOVIE</h2>
        <p>Are you sure you want to delete this movie?</p>
        <div className={styles['modal-buttons']}>
          <button className={styles['submit-btn']} onClick={onSubmit}>CONFIRM</button>
        </div>
      </>
    </Modal>
  );
};