import React from 'react';
import { screen, customRender } from '../../common/test-utils';
import { Filter } from '../Filter/Filter';
import { genresList } from '../Body/Body';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Filter', () => {
  test('Renders correctly', () => {
    const { asFragment } = customRender(<Filter genresList={genresList} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Genres present', () => {
    customRender(<Filter genresList={genresList} />);

    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/documentary/i)).toBeInTheDocument();
    expect(screen.getByText(/comedy/i)).toBeInTheDocument();
    expect(screen.getByText(/horror/i)).toBeInTheDocument();
    expect(screen.getByText(/crime/i)).toBeInTheDocument();
  });

  test('Changes classname on click', () => {
    customRender(<Filter genresList={genresList} />);

    const allGenre = screen.getByText(/all/i);
    const documentaryGenre = screen.getByText(/documentary/i);
    const comedyGenre = screen.getByText(/comedy/i);
    const horrorGenre = screen.getByText(/horror/i);
    const crimeGenre = screen.getByText(/crime/i);

    userEvent.click(comedyGenre);

    expect(comedyGenre).toHaveClass('active');
    expect(allGenre).not.toHaveClass('active');
    expect(documentaryGenre).not.toHaveClass('active');
    expect(horrorGenre).not.toHaveClass('active');
    expect(crimeGenre).not.toHaveClass('active');
  });
});
