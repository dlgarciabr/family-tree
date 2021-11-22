import userEvent from "@testing-library/user-event";
import { render, screen } from './utils/test-utils';
import App from './App';

test('render default app name', async () => {
  //arrange
  const enMessages = await import("./compiled-lang/en.json");
  const initialHeaderTitle = enMessages["app-title"][0].value;

  //act
  render(<App />);
  const content = await screen.findByText(initialHeaderTitle);

  //asset
  expect(content).toBeInTheDocument();
});

test("Change language to Spanish", async () => {
  //arrange
  const enMessages = await import("./compiled-lang/en.json");
  const esMessages = await import("./compiled-lang/es.json");

  const initialHeaderTitle = enMessages["app-title"][0].value;
  const expectedHeaderTitle = esMessages["app-title"][0].value;

  render(<App />);

  expect(screen.getByText(initialHeaderTitle)).toBeInTheDocument();

  //act
  const spanishLanguageButton = screen.getByRole("button", {
    name: 'Essda',
  });

  userEvent.click(spanishLanguageButton);

  //assert
  expect(await screen.findByText(expectedHeaderTitle)).toBeInTheDocument();
});

test("Change language to Portuguese", async () => {
  //arrange
  const enMessages = await import("./compiled-lang/en.json");
  const ptMessages = await import("./compiled-lang/pt.json");

  const initialHeaderTitle = enMessages["app-title"][0].value;
  const expectedHeaderTitle = ptMessages["app-title"][0].value;

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