import userEvent from "@testing-library/user-event";
import { render, screen } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import App from '../App';

// test('render main user area', async () => {
//   //arrange

//   //act
//   render(<App />);
//   const content = await screen.findByText("user area");

//   //asset
//   expect(content).toBeInTheDocument();
// });

test('render main area top bar', async () => {
  //arrange
  const initialHeaderTitle = await getLocatedMessage(locales.EN.value, 'app-title');

  //act
  render(<App />);
  const content = await screen.findByText(initialHeaderTitle);

  //asset
  expect(content).toBeInTheDocument();
});