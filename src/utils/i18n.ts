import { MessageFormatElement } from 'intl-messageformat-parser';

import English from '../compiled-lang/en.json';
import Spanish from '../compiled-lang/es.json';
import BrazillianPortuguese from '../compiled-lang/pt-br.json';
import Portuguese from '../compiled-lang/pt.json';

export const getUserLanguage = (): string => {
  const userLang: string = window.navigator.language;
  return userLang.split('-')[0];
};

export const loadLocaleMessages = (locale: string): Record<string, MessageFormatElement[]> => {
  switch (locale) {
    case 'pt-br':
      return BrazillianPortuguese;
    case 'es':
      return Spanish;
    case 'pt':
      return Portuguese;
    default:
      return English;
  }
};