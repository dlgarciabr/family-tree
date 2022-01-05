import userEvent from "@testing-library/user-event";
import { render, screen } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import App from '../App';

test.todo("render main area top bar");
// test('render main area top bar', async () => {
//   //arrange
//   const initialHeaderTitle = await getLocatedMessage(locales.EN.value, 'app-title');

//   //act
//   render(<App />);
//   const content = await screen.findByText(initialHeaderTitle);

//   //asset
//   expect(content).toBeInTheDocument();
// });