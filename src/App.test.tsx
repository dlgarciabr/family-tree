import userEvent from "@testing-library/user-event";
import { render, screen } from './utils/test-utils';
import { locales, getLocatedMessage } from './utils/i18n';
import App from './App';

describe("Change languages", () => {
  //global arrange
  const enHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');

  test("Change language to Spanish", async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const expectedHeaderTitle = getLocatedMessage(locales.ES.value, 'app-title');

    render(<App />);

    expect(await screen.findByText(enHeaderTitle)).toBeInTheDocument();

    //act
    const languageButton = screen.getByRole("button", {
      name: 'language-button'
    });

    userEvent.click(languageButton);

    const spanishLanguageButton = screen.getByRole("menuitem", {
      name: 'Español',
    });

    userEvent.click(spanishLanguageButton)

    // await new Promise((r) => setTimeout(r, 1000));

    //assert
    expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
  });

  test("Change language to Portuguese", async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const expectedHeaderTitle = getLocatedMessage(locales.PT.value, 'app-title');

    render(<App />);

    expect(await screen.findByText(enHeaderTitle)).toBeInTheDocument();

    //act
    const languageButton = screen.getByRole("button", {
      name: 'language-button'
    });

    userEvent.click(languageButton);

    const ptLanguageButton = screen.getByRole("menuitem", {
      name: 'Português',
    });

    userEvent.click(ptLanguageButton);

    //assert
    expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
  });

  test("Change language to Brazilian Portuguese", async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const expectedHeaderTitle = getLocatedMessage(locales.PT_BR.value, 'app-title');

    render(<App />);

    expect(await screen.findByText(enHeaderTitle)).toBeInTheDocument();

    //act
    const languageButton = screen.getByRole("button", {
      name: 'language-button'
    });

    userEvent.click(languageButton);

    const ptLanguageButton = screen.getByRole("menuitem", {
      name: 'Português Br',
    });

    userEvent.click(ptLanguageButton);

    //assert
    expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
  });

  test("Change language to Portuguese and then to English", async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const ptbrHeaderTitle = getLocatedMessage(locales.PT_BR.value, 'app-title');

    render(<App />);

    expect(await screen.findByText(enHeaderTitle)).toBeInTheDocument();

    const languageButton = screen.getByRole("button", {
      name: 'language-button'
    });

    userEvent.click(languageButton);

    const ptLanguageButton = screen.getByRole("menuitem", {
      name: 'Português Br',
    });

    userEvent.click(ptLanguageButton);

    expect(await screen.findByText(ptbrHeaderTitle)).toBeInTheDocument();

    //act
    userEvent.click(languageButton);

    const enLanguageButton = screen.getByRole("menuitem", {
      name: 'English',
    });

    userEvent.click(enLanguageButton);

    //assert
    expect(await screen.findByText(enHeaderTitle)).toBeInTheDocument();
  });

  test.todo('show toast sucess message on language change');
});