import userEvent from '@testing-library/user-event';

import { render, screen, navigateToHome } from 'utils/test-utils';
import { locales, getLocatedMessage } from 'utils/i18n';
import { waitForRequest } from '__mocks__/msw-server';
import App from 'App';

const baseUrl = process.env.REACT_APP_API_URL;

describe('Volunteer profile management', () => {

  test('Show My profile page', async () => {
    //arrange
    const myProfileTitle = getLocatedMessage(locales.EN.value, 'myprofile.title');
    const myProfileButtonLabel = getLocatedMessage(locales.EN.value, 'myprofile.button.label');
    const userId = 76;
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    const url = `${baseUrl}/user/${userId}`;
    const pendingRequest = waitForRequest('GET', url);

    //act
    render(<App />);

    const myProfileButton = screen.getByRole("link", { name: myProfileButtonLabel });
    userEvent.click(myProfileButton);

    //assert
    expect(
      await screen.findByRole("heading", { name: myProfileTitle })
    ).toBeInTheDocument();

    const request = await pendingRequest;

    expect(request.url.toString()).toEqual(url);

    //reset navigation
    await navigateToHome();
  });
});

