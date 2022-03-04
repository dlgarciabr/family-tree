import userEvent from '@testing-library/user-event';

import { render, screen/*, navigateToHome*/ } from 'utils/test-utils';
import { locales, getLocatedMessage } from 'utils/i18n';
import { addOrReplaceHandlers, mswServer } from '__mocks__/msw-server';
import App from 'App';
import {
  createSuccessGetUserHandler,
  createSuccessGetVolunteerHandler
} from '__mocks__/msw-handlers';

const baseUrl = process.env.REACT_APP_API_URL;

describe('Volunteer profile management', () => {

  const enAppTitle = getLocatedMessage(locales.EN.value, 'app.title');

  test('Show My profile page', async () => {
    //arrange
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    const myProfileTitle = getLocatedMessage(locales.EN.value, 'myprofile.title');
    const myProfileButtonLabel = getLocatedMessage(locales.EN.value, 'myprofile.button.label');
    const id = 76;
    const firstName = 'Sharon';
    const lastName = 'Stone';
    const title = 'Singer';
    const coverLetter = 'Like to sing';

    const successGetUserHandler = createSuccessGetUserHandler({
      id,
      firstName,
      lastName
    });

    const successGetVolunteerHandler = createSuccessGetVolunteerHandler({
      title,
      coverLetter
    });

    addOrReplaceHandlers(
      successGetUserHandler,
      successGetVolunteerHandler
    );

    render(<App />);

    //act
    expect(
      await screen.findByText(enAppTitle)
    ).toBeInTheDocument();

    const myProfileButton = screen.getByRole("link", { name: myProfileButtonLabel });
    userEvent.click(myProfileButton);

    //assert
    expect(
      await screen.findByRole("heading", { name: myProfileTitle })
    ).toBeInTheDocument();

    expect(screen.getByText(`${firstName} ${lastName}`)).toBeInTheDocument();
    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(await screen.findByText(coverLetter)).toBeInTheDocument();

    //reset navigation
    //await navigateToHome();
  });
});

