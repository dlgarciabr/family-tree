import userEvent from "@testing-library/user-event";
import { render, screen } from '../../utils/test-utils';
import App from '../App';

test('render main user area', async () => {
  //arrange

  //act
  render(<App />);
  const content = await screen.findByText("user area");

  //asset
  expect(content).toBeInTheDocument();
});

test('render main area top bar', async () => {
  //arrange

  //act
  render(<App />);
  const content = await screen.findByText("top bar");

  //asset
  // expect(content).toBeInTheDocument();
});