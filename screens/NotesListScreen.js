import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import NoteItem from '../components/NoteItem';
import EditNoteModal from '../components/EditNoteModal';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, updateNote, removeNote } from '../store/notesSlice';

const NotesListScreen = () => {
  const { t } = useTranslation();
  const { items: notes, status, error } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const openEdit = (note) => setEditing(note);
  const closeEdit = () => setEditing(null);

  const saveEdit = ({ title, content }) => {
    if (!editing) return;
    dispatch(updateNote({ id: editing.id, title, content }));
    closeEdit();
  };

  return (
    <View style={styles.container}>
      {status === 'loading' && (
        <Text style={{ textAlign: 'center' }}>{t('loading')}</Text>
      )}
      {status === 'failed' && !!error && (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      )}

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            id={item.id}
            title={item.title}
            content={item.content}
            date={item.createdAt}
            onEdit={() => openEdit(item)}
            onDelete={() => dispatch(removeNote(item.id))}
          />
        )}
        ListEmptyComponent={
          status !== 'loading' ? (
            <Text style={{ textAlign: 'center', marginTop: 16 }}>
              {t('notNotes')}
            </Text>
          ) : null
        }
      />

      <EditNoteModal
        visible={!!editing}
        onClose={closeEdit}
        initialTitle={editing?.title || ''}
        initialContent={editing?.content || ''}
        onSave={({ title, content }) => {
          dispatch(updateNote({ id: editing.id, title, content }));
          closeEdit();
        }}
      />
    </View>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
});
