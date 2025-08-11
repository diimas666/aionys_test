import { View, FlatList, StyleSheet } from 'react-native';
import NoteItem from '../components/NoteItem';
const notes = [
  { id: '1', title: 'Первая заметка', content: 'Текст заметки №1' },
  { id: '2', title: 'Вторая заметка', content: 'Текст заметки №2' },
  { id: '3', title: 'Третья заметка', content: 'Текст заметки №3' },
];
const NotesListScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => {
          return <NoteItem title={item.title} content={item.content} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NotesListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});
