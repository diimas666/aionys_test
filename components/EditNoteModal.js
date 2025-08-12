import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function EditNoteModal({
  visible,
  onClose,
  initialTitle = '',
  initialContent = '',
  onSave,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const { t } = useTranslation();

  useEffect(() => {
    if (visible) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [visible, initialTitle, initialContent]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave?.({ title: title.trim(), content: content.trim() });
    onClose?.();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <View style={styles.backdrop} />
        <View style={styles.card}>
          <Text style={styles.title}>{t('editNotes')}</Text>

          <TextInput
            testID="title-input"
            placeholder={t('title')}
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            testID="content-input"
            placeholder={t('text')}
            value={content}
            onChangeText={setContent}
            style={[styles.input, styles.multiline]}
            multiline
          />

          <View style={styles.row}>
            <Pressable
              testID="cancel-btn"
              style={[styles.btn, styles.secondary]}
              onPress={onClose}
            >
              <Text>{t('cancel')}</Text>
            </Pressable>
            <Pressable
              testID="save-btn"
              style={[styles.btn, styles.primary]}
              onPress={handleSave}
            >
              <Text style={styles.primaryText}>{t('save')}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1, justifyContent: 'center' },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  multiline: { height: 110, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 10, marginTop: 6 },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  secondary: { backgroundColor: '#fff', borderColor: '#ddd' },
  primary: { backgroundColor: '#111', borderColor: '#111' },
  primaryText: { color: '#fff', fontWeight: '600' },
});
