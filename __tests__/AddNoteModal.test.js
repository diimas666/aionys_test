import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddNoteModal from '../components/AddNoteModal';

describe('AddNoteModal', () => {
  it('saves trimmed values and closes', () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <AddNoteModal visible={true} onSave={onSave} onClose={onClose} />
    );

    fireEvent.changeText(getByPlaceholderText('title'), '  Hello  ');
    fireEvent.changeText(getByPlaceholderText('text'), '  world  ');
    fireEvent.press(getByText('save'));

    expect(onSave).toHaveBeenCalledWith({ title: 'Hello', content: 'world' });
    expect(onClose).toHaveBeenCalled();
  });

  it('does not save when title is empty/whitespace', () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <AddNoteModal visible={true} onSave={onSave} onClose={() => {}} />
    );
    fireEvent.press(getByText('save'));
    expect(onSave).not.toHaveBeenCalled();
  });
});
