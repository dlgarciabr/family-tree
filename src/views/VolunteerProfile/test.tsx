import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import { waitForRequest } from '../../__mocks__/msw-server';

import VolunteerProfile from '.';

describe('Volunteer profile management', () => {
  test('Show the volunteer profile page', async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');

    //act
    render(<VolunteerProfile />);
    //assert

    expect(
      screen.getByText('My profile')
    ).toBeInTheDocument();
  });
});

