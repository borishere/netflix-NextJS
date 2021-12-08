import React from 'react';
import { render, screen, customRender, waitFor } from '../../common/test-utils';
import userEvent from '@testing-library/user-event';
import { AddMovieModal, defaultMovie } from '../AddMovieModal/AddMovieModal';
import { Formik } from 'formik';
import { ImovieBase, validationSchema } from '../../Models/models';
import { ModalForm } from '../ModalForm/ModalForm';
import '@testing-library/jest-dom';

describe('ModalForm', () => {
  test('type to input', () => {
    customRender(
      <AddMovieModal
        isShown={true}
        show={jest.fn()}
      />
    );

    const linkInput = screen.getByPlaceholderText('https://');
    expect(linkInput).toBeInTheDocument();

    userEvent.type(linkInput, 'https://lol.com');
    expect(linkInput).toHaveDisplayValue('https://lol.com');
  });

  test('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn();

    render(
      <Formik<ImovieBase>
        initialValues={defaultMovie}
        validationSchema={validationSchema}
        onSubmit={(formValues) => {
          handleSubmit(formValues);
        }}
      >
        <ModalForm />
      </Formik>
    );

    userEvent.type(screen.getByLabelText('title-input'), 'John');
    userEvent.type(screen.getByLabelText('overview-input'), 'Non reiciendis in fuga voluptas dolorem provident eligendi debitis dignissimos.');
    userEvent.selectOptions(screen.getByLabelText('genres-select'), ['Comedy']);
    userEvent.type(screen.getByLabelText('rating-input'), '1');
    userEvent.type(screen.getByLabelText('runtime-input'), '1');
    userEvent.type(screen.getByLabelText('date-input'), '2021-11-10');
    userEvent.type(screen.getByLabelText('url-input'), 'https://joy.net');

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        title: 'John',
        overview: 'Non reiciendis in fuga voluptas dolorem provident eligendi debitis dignissimos.',
        genres: ['Comedy'],
        vote_average: 1,
        runtime: 1,
        release_date: '2021-11-10',
        poster_path: 'https://joy.net'
      })
    );
  });

  test('should show title validation on click on submit', async () => {
    customRender(
      <AddMovieModal
        isShown={true}
        show={jest.fn()}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByLabelText('titleError')).toHaveTextContent('title is a required field');
    });
  });

  test('Reset form', async () => {
    const handleSubmit = jest.fn();

    render(
      <Formik<ImovieBase>
        initialValues={defaultMovie}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ModalForm />
      </Formik>
    );

    const titleInput = screen.getByLabelText('title-input');
    const overviewInput = screen.getByLabelText('overview-input');
    const genresSelect = screen.getByLabelText('genres-select');
    const ratingInput = screen.getByLabelText('rating-input');
    const runtimeInput = screen.getByLabelText('runtime-input');
    const dateInput = screen.getByLabelText('date-input');
    const urlInput = screen.getByLabelText('url-input');

    userEvent.type(titleInput, 'Interstellar');
    userEvent.type(overviewInput, 'Ullam dolor architecto.');
    userEvent.selectOptions(genresSelect, ['Drama', 'Romance']);
    userEvent.type(ratingInput, '10');
    userEvent.type(runtimeInput, '90');
    userEvent.type(dateInput, '2011-12-10');
    userEvent.type(urlInput, 'https://sallie.info');

    userEvent.click(screen.getByRole('button', { name: /reset/i }));

    await waitFor(() => {
      expect(titleInput).toHaveValue('');
      expect(overviewInput).toHaveValue('');
      expect(genresSelect).toHaveValue([]);
      expect(ratingInput).toHaveValue(0);
      expect(runtimeInput).toHaveValue(0);
      expect(dateInput).toHaveValue('');
      expect(urlInput).toHaveValue('');
    });
  });
});
