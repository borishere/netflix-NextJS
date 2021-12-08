import React from 'react';
import { screen, customRender, waitFor } from '../../common/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal/Modal';

describe('Modal', () => {
  test('is visible', () => {
    const mockShow = jest.fn();

    const { asFragment } = customRender(
      <Modal
        modalClass='add-movie-modal'
        isShown={true}
        show={mockShow}
      >
        <div>content</div>
      </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  test('is hidden', () => {
    const mockShow = jest.fn();

    customRender(
      <Modal
        modalClass='add-movie-modal'
        isShown={false}
        show={mockShow}
      >
        <div>content</div>
      </Modal>
    );

    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  test('Close on X click', async () => {
    const mockShow = jest.fn();

    customRender(
      <Modal
        modalClass='add-movie-modal'
        isShown={true}
        show={mockShow}
      >
        <div>content</div>
      </Modal>
    );

    userEvent.click(screen.getByLabelText('close'));

    await waitFor(() => {
      expect(mockShow).toHaveBeenCalledWith(false);
    });
  });
});