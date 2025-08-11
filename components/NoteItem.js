import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // добавляем иконки
import { useTranslation } from 'react-i18next';

import MyButton from './MyButton';
const NoteItem = ({ title, content, onAdd, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      {/* title */}
      {/* Заголовок + иконка удаления */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="red" />
        </Pressable>
      </View>
      {/* тест  */}
      <Text style={styles.bodyText}>{content}</Text>
      {/* кнопки  */}
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <MyButton onPress={onAdd}>
            <Text style={styles.buttonText}>{t('buttons.add')}</Text>
          </MyButton>
        </View>
        <View style={styles.button}>
          <MyButton onPress={onEdit}>
            <Text style={styles.buttonText}>{t('buttons.edit')}</Text>{' '}
          </MyButton>
        </View>
      </View>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
