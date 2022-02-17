// import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
// import { locales, getLocatedMessage } from '../../utils/i18n';
import { waitForRequest } from '../../__mocks__/msw-server';

import VolunteerProfile from '.';

const baseUrl = process.env.REACT_APP_API_URL;

describe('Volunteer profile management', () => {
  test('Show the volunteer profile page', async () => {
    //arrange
    const volunteerId = 76;
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const pendingRequest = waitForRequest('GET', `${baseUrl}/user`);

    //act
    render(<VolunteerProfile />);

    //assert
    expect(
      screen.getByText('My profile')
    ).toBeInTheDocument();

    const request = await pendingRequest;

    expect(request.body).toEqual({
      volunteerId,
    });
  });
});

