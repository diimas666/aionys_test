import '@testing-library/jest-native/extend-expect';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (k) => k,
    i18n: { language: 'en', changeLanguage: jest.fn() }, 
  }),
  Trans: ({ children }) => children,
}));
jest.mock('expo-constants', () => ({ default: { expoConfig: {} } }));
jest.mock('expo-file-system', () => ({}));
jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));
