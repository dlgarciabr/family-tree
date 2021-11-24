import { getUserLanguage, loadLocaleMessages } from './index';

test("Recover user language from browser", () => {
    //arrange
    const expectedLanguage = "en";

    //act
    const userLanguage = getUserLanguage();

    //assert
    expect(userLanguage).toBe(expectedLanguage);
});

test("Recover Language message for Brazilian Portuguese", async () => {
    //arrange
    const locale = "pt-br";
    const ptbrFileMessages = await import("../../compiled-lang/pt-br.json");

    //act
    const messages = loadLocaleMessages(locale);

    //assert
    expect(messages["app-title"][0].value).toBe(ptbrFileMessages["app-title"][0].value);
});