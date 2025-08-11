import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import NoteItem from '../components/NoteItem';
import EditNoteModal from '../components/EditNoteModal';
import { useTranslation } from 'react-i18next';

const NotesListScreen = ({ notes, setNotes }) => {
  const { t } = useTranslation();

  const [editing, setEditing] = useState(null);

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const openEdit = (note) => setEditing(note);
  const closeEdit = () => setEditing(null);

  const saveEdit = ({ title, content }) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === editing.id ? { ...n, title, content } : n))
    );
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
            onAdd={() => {}}
            onEdit={() => openEdit(item)}
            onDelete={() => deleteNote(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            {t('notNotes')}
          </Text>
        }
      />

      {/* Модалка редактирования */}
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
