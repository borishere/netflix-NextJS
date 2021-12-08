import React from 'react';
import { screen, fireEvent, customRender } from '../../common/test-utils';
import { SearchForm } from '../Search/Search';
import '@testing-library/jest-dom';

test('Search', () => {
  const { asFragment } = customRender(<SearchForm />);
  expect(asFragment()).toMatchSnapshot();

  const input: any = screen.getByPlaceholderText('What do you want to watch?');
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'titanic' } });
  expect(input.value).toBe('titanic');
});
