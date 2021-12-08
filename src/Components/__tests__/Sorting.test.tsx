import React from 'react';
import { screen, customRender } from '../../common/test-utils';
import { Sorting } from '../Sorting/Sorting';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Sorting', () => {
  test('Renders', () => {
    const { asFragment } = customRender(<Sorting />);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('SORT BY')).toBeInTheDocument();
  });

  test('Renders options', () => {
    customRender(<Sorting />);

    const sortingSelect = screen.getByLabelText('sorting-select');

    userEvent.selectOptions(sortingSelect, 'vote_count');

    expect(sortingSelect).toHaveTextContent('rating');
  });
});