import { getUserLanguage, getLocatedMessage } from './index';
import { locales } from 'utils/i18n';

test("Recover user language from browser", () => {
  //arrange
  const expectedLanguage = locales.EN.value;

  //act
  const userLanguage = getUserLanguage();

  //assert
  expect(userLanguage).toBe(expectedLanguage);
});

test("Recover Language message for Brazilian Portuguese", async () => {
  //arrange
  const locale = locales.PT_BR.value;
  const ptbrFileMessages = await import('lang/pt-br.json');

  //act
  const message = getLocatedMessage(locale, "app-title");

  //assert
  expect(message).toBe(ptbrFileMessages["app-title"]);
});