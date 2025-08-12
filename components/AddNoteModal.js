import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function AddNoteModal({ visible, onClose, onSave }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const titleTrim = title.trim();
    if (!titleTrim) return;
    onSave?.({ title: titleTrim, content: content.trim() });
    setTitle('');
    setContent('');
    onClose?.();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <Text style={styles.title}>{t('noteTitle')}</Text>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >
            <TextInput
              placeholder={t('title')}
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              returnKeyType="next"
            />
            <TextInput
              placeholder={t('text')}
              value={content}
              onChangeText={setContent}
              style={[styles.input, styles.multiline]}
              multiline
            />
          </ScrollView>

          <View style={styles.row}>
            <Pressable
              style={[styles.btn, styles.primary]}
              onPress={handleSave}
            >
              <Text style={styles.primaryText}>{t('save')}</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.secondary]} onPress={onClose}>
              <Text>{t('cancel')}</Text>
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
  sheet: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  content: { paddingBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
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
  secondary: { backgroundColor: '#e72929ff', borderColor: '#ddd' },
  primary: { backgroundColor: '#4f59c9ff', borderColor: '#111' },
  primaryText: { color: '#fff', fontWeight: '600' },
});
