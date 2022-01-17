import userEvent from "@testing-library/user-event";
import { render, screen } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import { mswServer } from '../../__mocks__/msw-server';
import { successValidateTokenHandler } from '../../__mocks__/msw-handlers';
import App from '.';

describe("Change languages", () => {
    //global arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const enHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');

    test("Change language to Spanish", async () => {
        //arrange
        mswServer.use(successValidateTokenHandler);
        const expectedHeaderTitle = getLocatedMessage(locales.ES.value, 'app-title');

        render(<App />);

        expect(screen.getByText(enHeaderTitle)).toBeInTheDocument();

        //act
        const languageButton = screen.getByRole("button", {
            name: 'language-button'
        });

        userEvent.click(languageButton);

        const spanishLanguageButton = screen.getByRole("menuitem", {
            name: 'Es',
        });

        userEvent.click(spanishLanguageButton);

        //assert
        expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
    });

    test("Change language to Portuguese", async () => {
        //arrange
        mswServer.use(successValidateTokenHandler);
        const expectedHeaderTitle = getLocatedMessage(locales.PT.value, 'app-title');

        render(<App />);

        expect(screen.getByText(enHeaderTitle)).toBeInTheDocument();

        //act
        const languageButton = screen.getByRole("button", {
            name: 'language-button'
        });

        userEvent.click(languageButton);

        const ptLanguageButton = screen.getByRole("menuitem", {
            name: 'Pt',
        });

        userEvent.click(ptLanguageButton);

        //assert
        expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
    });

    test("Change language to Brazilian Portuguese", async () => {
        //arrange
        mswServer.use(successValidateTokenHandler);
        const expectedHeaderTitle = getLocatedMessage(locales.PT_BR.value, 'app-title');

        render(<App />);

        expect(screen.getByText(enHeaderTitle)).toBeInTheDocument();

        //act
        const languageButton = screen.getByRole("button", {
            name: 'language-button'
        });

        userEvent.click(languageButton);

        const ptLanguageButton = screen.getByRole("menuitem", {
            name: 'Pt-Br',
        });

        userEvent.click(ptLanguageButton);

        //assert
        expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
    });

    test("Change language to Portuguese and then to English", async () => {
        //arrange
        mswServer.use(successValidateTokenHandler);
        const ptbrHeaderTitle = getLocatedMessage(locales.PT_BR.value, 'app-title');

        render(<App />);

        expect(screen.getByText(enHeaderTitle)).toBeInTheDocument();

        const languageButton = screen.getByRole("button", {
            name: 'language-button'
        });

        userEvent.click(languageButton);

        const ptLanguageButton = screen.getByRole("menuitem", {
            name: 'Pt-Br',
        });

        userEvent.click(ptLanguageButton);

        expect(await screen.findByText(ptbrHeaderTitle)).toBeInTheDocument();

        //act
        userEvent.click(languageButton);

        const enLanguageButton = screen.getByRole("menuitem", {
            name: 'En',
        });

        userEvent.click(enLanguageButton);

        //assert
        expect(await screen.findByText(enHeaderTitle)).toBeInTheDocument();
    });

    test.todo('show toast sucess message on language change');
});

test('Open login page if there he is not logged in', async () => {

})