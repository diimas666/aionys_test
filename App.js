import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import NotesListScreen from './screens/NotesListScreen';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

// components
import AddNoteModal from './components/AddNoteModal';
import { Ionicons } from '@expo/vector-icons';
const INITIAL_NOTES = [
  {
    id: '1',
    title: 'Первая заметка',
    content: 'Текст заметки №1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Вторая заметка',
    content: 'Текст заметки №2',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Третья заметка',
    content: 'Текст заметки №3',
    createdAt: new Date().toISOString(),
  },
];
export default function App() {
  const { t } = useTranslation();
  const [notes, setNotes] = useState(INITIAL_NOTES);

  const [showModal, setShowModal] = useState(false);

  const initialLang = useMemo(
    () => (i18n.language?.startsWith('ru') ? 'ru' : 'en'),
    []
  );
  const [lang, setLang] = useState(initialLang);

  const langs = ['EN', 'RU'];
  const [index, setIndex] = useState(initialLang === 'ru' ? 1 : 0);

  useEffect(() => {
    setIndex(lang === 'ru' ? 1 : 0);
  }, [lang]);

  const onChangeLang = (value) => {
    setLang(value);
    i18n.changeLanguage(value);
  };
  const handleAddNote = (note) =>
    setNotes((prev) => [
      { ...note, createdAt: note.createdAt || new Date().toISOString() },
      ...prev,
    ]);
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{t('hello')}</Text>

          <View style={styles.segmentWrap}>
            <SegmentedControl
              values={langs}
              selectedIndex={index}
              onChange={(e) => {
                const i = e.nativeEvent.selectedSegmentIndex;
                setIndex(i);
                onChangeLang(i === 1 ? 'ru' : 'en');
              }}
            />
          </View>
        </View>

        <Text style={styles.subText}>{t('welcome')}</Text>
        <NotesListScreen notes={notes} setNotes={setNotes} />

        {/* Button */}
        <Pressable
          style={styles.fab}
          onPress={() => setShowModal(true)}
          accessibilityLabel={t('addNote.a11y')}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
        {/* modal  */}
        <AddNoteModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleAddNote}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 26,
    bottom: 26,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6, // Android тень
    shadowColor: '#000', // iOS тень
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 2,
    paddingBottom: 20,
    borderBottomColor: 'black',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    flexShrink: 1,
  },
  segmentWrap: {
    marginLeft: 'auto',
    width: 120,
  },
  subText: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 18,
    textAlign: 'center',
  },
});
