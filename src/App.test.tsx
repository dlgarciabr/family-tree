import userEvent from "@testing-library/user-event";
import { render, screen, navigateToHome } from './utils/test-utils';
import { locales, getLocatedMessage } from './utils/i18n';
import App from './App';

//global arrange
const enHeaderTitle = getLocatedMessage(locales.EN.value, 'app.title');

describe("Language changing", () => {
  test("Change language to Spanish", async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const expectedHeaderTitle = getLocatedMessage(locales.ES.value, 'app.title');

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
    const expectedHeaderTitle = getLocatedMessage(locales.PT.value, 'app.title');

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
    const expectedHeaderTitle = getLocatedMessage(locales.PT_BR.value, 'app.title');

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
    const ptbrHeaderTitle = getLocatedMessage(locales.PT_BR.value, 'app.title');

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

  // TODO:implement
  test.todo('show toast sucess message on language change');
});

describe("Global behavior", () => {
  test('Show nav bar when access a secured page', async () => {
    //arrange
    const mainAreaTitle = getLocatedMessage(locales.EN.value, 'main.area.title');
    const myProfileTitle = getLocatedMessage(locales.EN.value, 'myprofile.title');
    const myProfileButtonLabel = getLocatedMessage(locales.EN.value, 'myprofile.button.label');
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    render(<App />);

    expect(
      await screen.findByText(enHeaderTitle)
    ).toBeInTheDocument();

    //act
    const myProfileButton = screen.getByRole('link', { name: myProfileButtonLabel });
    userEvent.click(myProfileButton);

    //assert

    expect(
      await screen.findByRole('heading', { name: myProfileTitle })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(enHeaderTitle)
    ).toBeInTheDocument();

    //reset navigation
    await navigateToHome();
  });
});