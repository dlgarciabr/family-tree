import { getUserLanguage, loadLocaleMessages } from './index';
import { locales, getLocatedMessage } from '../../utils/i18n';

test("Recover user language from browser", () => {
    //arrange
    const expectedLanguage = locales.EN;

    //act
    const userLanguage = getUserLanguage();

    //assert
    expect(userLanguage).toBe(expectedLanguage);
});

test("Recover Language message for Brazilian Portuguese", async () => {
    //arrange
    const locale = locales.PT_BR;
    const ptbrFileMessages = await import("../../compiled-lang/pt-br.json");

    //act
    const messages = loadLocaleMessages(locale);

    //assert
    expect((messages["app-title"][0] as any).value).toBe(ptbrFileMessages["app-title"][0].value);
});