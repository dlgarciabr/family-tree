import { MessageFormatElement } from 'intl-messageformat-parser';

import English from '../../compiled-lang/en.json';
import Spanish from '../../compiled-lang/es.json';
import BrazillianPortuguese from '../../compiled-lang/pt-br.json';
import Portuguese from '../../compiled-lang/pt.json';

export const locales = {
  EN: 'en',
  ES: 'es',
  PT: 'pt',
  PT_BR: 'pt-br',
}

export const getUserLanguage = (): string => {
  const userLang: string = window.navigator.language;
  return userLang.split('-')[0];
};

export const loadLocaleMessages = (locale: string): Record<string, MessageFormatElement[]> => {
  switch (locale) {
    case locales.PT_BR:
      return BrazillianPortuguese;
    case locales.ES:
      return Spanish;
    case locales.PT:
      return Portuguese;
    default:
      return English;
  }
};