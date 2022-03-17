import userEvent from '@testing-library/user-event';

import { render, screen/*, navigateToHome*/ } from 'utils/test-utils';
import { locales } from 'utils/i18n';
import { addOrReplaceHandlers, mswServer } from '__mocks__/msw-server';
import App from 'App';
import {
  createSuccessGetUserHandler,
  createSuccessGetVolunteerHandler
} from '__mocks__/msw-handlers';

const baseUrl = process.env.REACT_APP_API_URL;

describe('Volunteer profile management', () => {

  const enAppTitle = locales.EN.getMessage('app.title');

  test('Show My profile page', async () => {
    //arrange
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    const myProfileTitle = locales.EN.getMessage('myprofile.title');
    const myProfileButtonLabel = locales.EN.getMessage('myprofile.button.label');
    const id = 76;
    const firstName = 'Sharon';
    const lastName = 'Stone';
    const title = 'Singer';
    const coverLetter = 'Like to sing';
    const preferedSupportType = locales.EN.getMessage('prefered.support.type.remote');
    const preferedSupportLanguages = 'ru, jp';
    const email = 'abc@gmailtech.pt';
    const phone = '910933252';

    const successGetUserHandler = createSuccessGetUserHandler({
      id,
      firstName,
      lastName,
      email
    });

    const successGetVolunteerHandler = createSuccessGetVolunteerHandler({
      title,
      coverLetter,
      preferedSupportType: 'REMOTE',
      preferedSupportLanguages,
      phone
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
    expect(await screen.findByText(preferedSupportType, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(preferedSupportLanguages, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(email, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(phone, { exact: false })).toBeInTheDocument();
  });
});

