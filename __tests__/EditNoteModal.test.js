import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditNoteModal from '../components/EditNoteModal';

describe('EditNoteModal', () => {
  it('prefills inputs and saves trimmed', () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <EditNoteModal
        visible={true}
        onClose={onClose}
        onSave={onSave}
        initialTitle="  Old "
        initialContent="  Text "
      />
    );

    // проверим, что подставилось
    expect(getByPlaceholderText('title').props.value).toBe('  Old ');
    expect(getByPlaceholderText('text').props.value).toBe('  Text ');

    fireEvent.changeText(getByPlaceholderText('title'), '  New Title  ');
    fireEvent.changeText(getByPlaceholderText('text'), '  New Body  ');
    fireEvent.press(getByText('save'));

    expect(onSave).toHaveBeenCalledWith({
      title: 'New Title',
      content: 'New Body',
    });
    expect(onClose).toHaveBeenCalled();
  });
});
