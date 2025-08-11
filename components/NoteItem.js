import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import MyButton from './MyButton';

const NoteItem = ({ title, content, date, onAdd, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith('ru') ? 'ru-RU' : 'en-US';
  const formatted = date
    ? new Date(date).toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      <Text style={styles.bodyText}>{content}</Text>

      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <MyButton onPress={onDelete}>
            <View style={styles.deleteRow}>
              <Ionicons name="trash" size={16} color="red" />
              <Text style={styles.buttonText}>{t('buttons.delete')}</Text>
            </View>
          </MyButton>
        </View>
        <View style={styles.button}>
          <MyButton onPress={onEdit}>
            <Text style={styles.buttonText}>{t('buttons.edit')}</Text>
          </MyButton>
        </View>
      </View>

      {/* Дата внизу карточки */}
      {!!formatted && (
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color="#777" />
          <Text style={styles.metaText}>{formatted}</Text>
        </View>
      )}
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
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    flex: 1,
  },
  bodyText: { fontSize: 16, marginBottom: 20 },
  buttonsContainer: { flexDirection: 'row' },
  button: { flex: 1, marginHorizontal: 4 },
  buttonText: { fontSize: 14, textAlign: 'center' },
  deleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  metaRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    opacity: 0.7,
  },
  metaText: { fontSize: 12, color: '#666' },
});
