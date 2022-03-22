import English from 'lang/en.json';
import Spanish from 'lang/es.json';
import BrazillianPortuguese from 'lang/pt-br.json';
import Portuguese from 'lang/pt.json';
import { Locale } from 'types';

export const locales: Record<string, Locale> = {
  EN: {
    value: 'en',
    name: 'English',
    messages: English,
    getMessage(key: string) { return this.messages[key]; }
  },
  ES: {
    value: 'es',
    name: 'Español',
    messages: Spanish,
    getMessage(key: string) { return this.messages[key]; }
  },
  PT: {
    value: 'pt',
    name: 'Português',
    messages: Portuguese,
    getMessage(key: string) { return this.messages[key]; }
  },
  PT_BR: {
    value: 'pt-br',
    name: 'Português Br',
    messages: BrazillianPortuguese,
    getMessage(key: string) { return this.messages[key]; }
  },
};

export const getUserLanguage = (): string => {
  const userLang: string = window.navigator.language;
  return userLang.split('-')[0];
};
