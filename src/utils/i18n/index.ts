import English from 'lang/en.json';
import Spanish from 'lang/es.json';
import BrazillianPortuguese from 'lang/pt-br.json';
import Portuguese from 'lang/pt.json';

export const locales: { [key: string]: { value: string, label: string } } = {
  EN: {
    value: 'en',
    label: 'English'
  },
  ES: {
    value: 'es',
    label: 'Español'
  },
  PT: {
    value: 'pt',
    label: 'Português'
  },
  PT_BR: {
    value: 'pt-br',
    label: 'Português Br'
  },
};

export const getUserLanguage = (): string => {
  const userLang: string = window.navigator.language;
  return userLang.split('-')[0];
};

export const loadLocaleMessages = (locale: string): Record<string, string> => {
  switch (locale) {
    case locales.PT_BR.value:
      return BrazillianPortuguese;
    case locales.ES.value:
      return Spanish;
    case locales.PT.value:
      return Portuguese;
    default:
      return English;
  }
};

export const getLocatedMessage = (locale: string, key: string) => {
  const messages = loadLocaleMessages(locale);
  return messages[key];
};