import '@testing-library/jest-native/extend-expect';

// i18n заглушка (у тебя есть react-i18next)
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: { language: 'en', changeLanguage: jest.fn() }, // <-- добавили i18n
  }),
  Trans: ({ children }) => children,
}));
// простые заглушки для expo-модулей
jest.mock('expo-constants', () => ({ default: { expoConfig: {} } }));
jest.mock('expo-file-system', () => ({}));
jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));
