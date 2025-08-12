import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (sel) =>
    sel({
      notes: {
        items: [
          { id: '1', title: 'First', content: 'One', createdAt: Date.now() },
          { id: '2', title: 'Second', content: 'Two', createdAt: Date.now() },
        ],
        status: 'idle',
        error: null,
      },
    }),
}));

jest.mock('../store/notesSlice', () => ({
  fetchNotes: () => ({ type: 'notes/fetchNotes' }),
  updateNote: (p) => ({ type: 'notes/updateNote', payload: p }),
  removeNote: (id) => ({ type: 'notes/removeNote', payload: id }),
}));

import NotesListScreen from '../screens/NotesListScreen';

describe('NotesListScreen', () => {
  beforeEach(() => mockDispatch.mockClear());

  it('dispatches removeNote on first item delete', () => {
    const { getAllByTestId } = render(<NotesListScreen />);
    const deletes = getAllByTestId('delete-btn');
    fireEvent.press(deletes[0]);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'notes/removeNote',
      payload: '1',
    });
  });

  it('opens edit modal and dispatches update on save', () => {
    const { getAllByTestId, getByPlaceholderText, getByText } = render(
      <NotesListScreen />
    );

    fireEvent.press(getAllByTestId('edit-btn')[0]);

    fireEvent.changeText(getByPlaceholderText('title'), 'New Title');
    fireEvent.changeText(getByPlaceholderText('text'), 'New Body');
    fireEvent.press(getByText('save')); // т.к. t('save') -> "save" в моках

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'notes/updateNote',
      payload: { id: '1', title: 'New Title', content: 'New Body' },
    });
  });
});
