import userEvent from "@testing-library/user-event";
import { render, screen } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import App from '.';

test("Change language to Spanish", async () => {
  //arrange
  const initialHeaderTitle = getLocatedMessage(locales.EN, 'app-title');
  const expectedHeaderTitle = getLocatedMessage(locales.ES, 'app-title');

  render(<App />);

  expect(screen.getByText(initialHeaderTitle)).toBeInTheDocument();

  //act
  const spanishLanguageButton = screen.getByRole("button", {
    name: 'Es',
  });

  userEvent.click(spanishLanguageButton);

  //assert
  expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
});

test("Change language to Portuguese", async () => {
  //arrange
  const initialHeaderTitle = getLocatedMessage(locales.EN, 'app-title');
  const expectedHeaderTitle = getLocatedMessage(locales.PT, 'app-title');

  render(<App />);

  expect(screen.getByText(initialHeaderTitle)).toBeInTheDocument();

  //act
  const ptLanguageButton = screen.getByRole("button", {
    name: 'Pt',
  });

  userEvent.click(ptLanguageButton);

  //assert
  expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
});

test("Change language to Brazilian Portuguese", async () => {
  //arrange
  const initialHeaderTitle = getLocatedMessage(locales.EN, 'app-title');
  const expectedHeaderTitle = getLocatedMessage(locales.PT_BR, 'app-title');

  render(<App />);

  expect(screen.getByText(initialHeaderTitle)).toBeInTheDocument();

  //act
  const ptLanguageButton = screen.getByRole("button", {
    name: 'Pt-Br',
  });

  userEvent.click(ptLanguageButton);

  //assert
  expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
});

test("Change language to Portuguese and then to English", async () => {
  //arrange
  const enHeaderTitle = getLocatedMessage(locales.EN, 'app-title');
  const ptbrHeaderTitle = getLocatedMessage(locales.PT_BR, 'app-title');

  render(<App />);

  expect(screen.getByText(enHeaderTitle)).toBeInTheDocument();

  const ptLanguageButton = screen.getByRole("button", {
    name: 'Pt-Br',
  });

  userEvent.click(ptLanguageButton);

  expect(await screen.findByText(ptbrHeaderTitle)).toBeInTheDocument();
  //act

  const enLanguageButton = screen.getByRole("button", {
    name: 'En',
  });

  userEvent.click(enLanguageButton);

  //assert
  expect(await screen.findByText(enHeaderTitle)).toBeInTheDocument();
});

test.todo("show toast sucess message on language change");