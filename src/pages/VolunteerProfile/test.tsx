import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
// import { locales, getLocatedMessage } from '../../utils/i18n';
import { waitForRequest } from '../../__mocks__/msw-server';

import VolunteerProfile from '.';
import MainArea from 'pages/MainArea';
import App from 'App';
// import { act } from 'react-dom/test-utils';

const baseUrl = process.env.REACT_APP_API_URL;

describe('Volunteer profile management', () => {

  test('Show the volunteer profile page', async () => {
    //arrange
    const userId = 76;
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    const url = `${baseUrl}/user`;
    const pendingRequest = waitForRequest('GET', `${url}/${userId}`);

    //act
    render(<App />);

    const myProfileButton = screen.getByRole("link", { name: 'View My profile' });

    // act(() => {
    userEvent.click(myProfileButton);
    // });


    //assert
    // await waitFor(() =>
    //   expect(
    //     screen.getByText('My profile')
    //   ).not.toBeInTheDocument()
    // );


    expect(
      await screen.findByText('My profile')
    ).toBeInTheDocument();

    console.log("pre-request");
    const request = await pendingRequest;

    console.log("pos-request");

    // expect(request.url.toString()).toEqual(`${url}/${userId}`);

    //TODO redirect to root url
    const backButton = screen.getByRole("link", { name: 'Main area' });
    userEvent.click(backButton);
  });
});

