import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NoteItem from '../components/NoteItem';

describe('NoteItem', () => {
  it('calls onDelete and onEdit', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    const { getByTestId } = render(
      <NoteItem
        title="T"
        content="C"
        date={Date.now()}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    );

    fireEvent.press(getByTestId('delete-btn'));
    fireEvent.press(getByTestId('edit-btn'));

    expect(onDelete).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
  });
});
