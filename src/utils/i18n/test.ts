import { getUserLanguage } from './index';
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
  const appTitleKey = "app.title";
  const ptbrFileMessages = await import('lang/pt-br.json');

  //act
  const message = locales.PT_BR.getMessage(appTitleKey);

  //assert
  expect(message).toBe(ptbrFileMessages[appTitleKey]);
});