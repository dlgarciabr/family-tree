import userEvent from "@testing-library/user-event";
import { render, screen } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import App from '.';

test("Change language to Spanish", async () => {
  //arrange
  const initialHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');
  const expectedHeaderTitle = getLocatedMessage(locales.ES.value, 'app-title');

  render(<App />);

  expect(screen.getByText(initialHeaderTitle)).toBeInTheDocument();

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
  const initialHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');
  const expectedHeaderTitle = getLocatedMessage(locales.PT.value, 'app-title');

  render(<App />);

  expect(screen.getByText(initialHeaderTitle)).toBeInTheDocument();

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
  const initialHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');
  const expectedHeaderTitle = getLocatedMessage(locales.PT_BR.value, 'app-title');

  render(<App />);

  expect(screen.getByText(initialHeaderTitle)).toBeInTheDocument();

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
  const enHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');
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

test.todo("show toast sucess message on language change");