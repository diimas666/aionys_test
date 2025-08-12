import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import NoteItem from '../components/NoteItem';
import EditNoteModal from '../components/EditNoteModal';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote, editNote } from '../store/notesSlice';

const NotesListScreen = () => {
  const { t } = useTranslation();

  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);

  const openEdit = (note) => setEditing(note);
  const closeEdit = () => setEditing(null);

  const saveEdit = ({ title, content }) => {
    dispatch(editNote({ id: editing.id, title, content }));
    closeEdit();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            title={item.title}
            content={item.content}
            date={item.createdAt}
            onEdit={() => openEdit(item)}
            onDelete={() => dispatch(deleteNote(item.id))}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            {t('notNotes')}
          </Text>
        }
      />

      <EditNoteModal
        visible={!!editing}
        onClose={closeEdit}
        initialTitle={editing?.title || ''}
        initialContent={editing?.content || ''}
        onSave={saveEdit}
      />
    </View>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
});
