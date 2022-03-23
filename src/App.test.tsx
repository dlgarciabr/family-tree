import userEvent from "@testing-library/user-event";
import { render, screen, navigateTo, navigateToHome } from './utils/test-utils';
import { locales } from './utils/i18n';
import App from './App';
// import jsdom from 'jsdom';

//global arrange
const enAppTitle = locales.EN.getMessage('app.title');

describe("Language changing", () => {
  test("Change language to Spanish", async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const expectedHeaderTitle = locales.ES.messages['app.title'];

    render(<App />);

    expect(await screen.findByText(enAppTitle)).toBeInTheDocument();

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
    const expectedHeaderTitle = locales.PT.messages['app.title'];

    render(<App />);

    expect(await screen.findByText(enAppTitle)).toBeInTheDocument();

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
    const expectedHeaderTitle = locales.PT_BR.messages['app.title'];

    render(<App />);

    expect(await screen.findByText(enAppTitle)).toBeInTheDocument();

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
    const ptbrHeaderTitle = locales.PT_BR.messages['app.title'];

    render(<App />);

    expect(await screen.findByText(enAppTitle)).toBeInTheDocument();

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
    expect(await screen.findByText(enAppTitle)).toBeInTheDocument();
  });

  // TODO:implement
  test.todo('show toast sucess message on language change');
});

describe("Global behavior", () => {
  test('Global behavior:Show nav bar when access a secured page', async () => {
    //arrange
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    render(<App />);

    expect(
      await screen.findByText(enAppTitle)
    ).toBeInTheDocument();

    //act
    const dummyLink = screen.getByRole('link', { name: 'Show protected dummy' });
    userEvent.click(dummyLink);

    //assert

    expect(
      await screen.findByText('dummy component')
    ).toBeInTheDocument();

    expect(
      await screen.findByText(enAppTitle)
    ).toBeInTheDocument();
  });

  test('Show Not found page when there is no resource to URL without any active session', async () => {
    //arrange
    // window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    render(<App />);

    expect(
      await screen.findByText(locales.EN.getMessage('signin.title'))
    ).toBeInTheDocument();

    //act
    navigateTo('aaaaa');

    //assert
    expect(
      await screen.findByText('page not found')
    ).toBeInTheDocument();
  });

  test('Show Not found page when there is no resource to URL with user logged in', async () => {
    //arrange
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    render(<App />);
    await navigateToHome();

    expect(
      await screen.findByText(enAppTitle)
    ).toBeInTheDocument();

    //act
    navigateTo('aaaaa');

    //assert
    expect(
      await screen.findByText('page not found')
    ).toBeInTheDocument();
  });
});