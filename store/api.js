
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Пытаемся достать IP машины, на которой крутится Metro
const debuggerHost =
  Constants.manifest?.debuggerHost ?? // старые Expo
  Constants.expoConfig?.hostUri ?? // новые Expo
  '';

const hostFromExpo = debuggerHost.split(':')[0]; // "192.168.0.103"

const isAndroidEmu = Platform.OS === 'android' && !hostFromExpo; // запасной кейс

// Базовый адрес API
export const API_BASE = hostFromExpo
  ? `http://${hostFromExpo}:4000` // реальное устройство / iOS симулятор
  : isAndroidEmu
  ? 'http://10.0.2.2:4000' // Android эмулятор
  : 'http://localhost:4000'; // веб/прочее

export const API_URL = `${API_BASE}/notes`;
