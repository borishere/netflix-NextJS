import React from 'react';
import { screen, customRender, waitFor } from '../../common/test-utils';
import { Imovie } from '../../Models/models';
import userEvent from '@testing-library/user-event';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import '@testing-library/jest-dom';

describe('ContextMenu', () => {
  const movie: Imovie = {
    id: 76338,
    title: 'Thor: The Dark World',
    tagline: 'Delve into the darkness',
    vote_average: 6.7,
    vote_count: 6522,
    release_date: '2013-10-29',
    poster_path: 'https://image.tmdb.org/t/p/w500/bnX5PqAdQZRXSw3aX3DutDcdso5.jpg',
    overview: 'Thor fights to restore order across the cosmos… but an ancient race led by the vengeful Malekith returns to plunge the universe back into darkness. Faced with an enemy that even Odin and Asgard cannot withstand, Thor must embark on his most perilous and personal journey yet, one that will reunite him with Jane Foster and force him to sacrifice everything to save us all.',
    budget: 170000000,
    revenue: 644571402,
    genres: [
      'documentary',
      'comedy'
    ],
    runtime: 112
  };

  test('Renders', () => {
    const { asFragment } = customRender(
      <ContextMenu
        setShow={jest.fn()}
        movie={movie}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Shows buttons', () => {
    const mockShow = jest.fn();

    customRender(
      <ContextMenu
        setShow={mockShow}
        movie={movie}
      />
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('Close on X click', async () => {
    const mockShow = jest.fn();

    customRender(
      <ContextMenu
        setShow={mockShow}
        movie={movie}
      />
    );

    const closeBtn = screen.getByLabelText('close-btn');

    expect(closeBtn).toBeInTheDocument();

    userEvent.click(closeBtn);

    await waitFor(() => {
      expect(mockShow).toHaveBeenCalledWith(false);
    });
  });
});