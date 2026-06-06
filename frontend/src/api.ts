import axios from 'axios';
import i18n from './i18n';

export const api = axios.create({
  // Default backend port for NestJS is 3000
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  // Automatically append the current language to queries
  config.params = config.params || {};
  if (!config.params.lang) {
    config.params.lang = i18n.language;
  }
  return config;
});
