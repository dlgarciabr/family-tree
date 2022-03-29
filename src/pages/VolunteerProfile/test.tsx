import userEvent from '@testing-library/user-event';

import { render, screen, navigateToHome, navigateTo, roles } from 'utils/test-utils';
import { locales } from 'utils/i18n';
import { addOrReplaceHandlers } from '__mocks__/msw-server';
import App from 'App';
import {
  createSuccessGetUserHandler,
  createSuccessGetVolunteerHandler
} from '__mocks__/msw-handlers';
import { Routes } from 'components/AppRoutes';

describe('Volunteer profile management', () => {

  const enAppTitle = locales.EN.getMessage('app.title');

  test('Show My profile page', async () => {
    //arrange
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    const myProfileTitle = locales.EN.getMessage('volunteerProfile.myProfle.header.label');
    const myProfileButtonLabel = locales.EN.getMessage('myprofile.button.label');
    const id = 4;
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
    await navigateToHome();

    //act
    expect(
      await screen.findByText(enAppTitle)
    ).toBeInTheDocument();

    const myProfileButton = screen.getByRole(roles.LINK, { name: myProfileButtonLabel });
    userEvent.click(myProfileButton);

    //assert
    expect(
      await screen.findByRole(roles.HEADING, { name: myProfileTitle })
    ).toBeInTheDocument();

    expect(await screen.findByText(`${firstName} ${lastName}`)).toBeInTheDocument();
    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(await screen.findByText(coverLetter)).toBeInTheDocument();
    expect(await screen.findByText(preferedSupportType, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(preferedSupportLanguages, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(email, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(phone, { exact: false })).toBeInTheDocument();
  });

  test('Show a random volunteer profile page', async () => {
    //arrange
    window.sessionStorage.setItem('credentials', '{ "id": 4, "token": "1567854363452345" }');
    const profileTitle = locales.EN.getMessage('volunteerProfile.header.label');
    const id = 76;
    const firstName = 'Alba';
    const lastName = 'Valery';
    const title = 'Lawer';
    const coverLetter = 'Fight against injustice';
    const preferedSupportType = locales.EN.getMessage('prefered.support.type.remote');
    const preferedSupportLanguages = 'en, pt';
    const email = 'albavalery@gimail.pt';
    const phone = '910629423';

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

    await navigateToHome();

    //act
    await navigateTo(`${Routes.VOLUNTEER_PROFILE}8`);

    //assert
    expect(
      await screen.findByRole(roles.HEADING, { name: profileTitle })
    ).toBeInTheDocument();

    expect(await screen.findByText(`${firstName} ${lastName}`)).toBeInTheDocument();
    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(await screen.findByText(coverLetter)).toBeInTheDocument();
    expect(await screen.findByText(preferedSupportType, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(preferedSupportLanguages, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(email, { exact: false })).toBeInTheDocument();
    expect(await screen.findByText(phone, { exact: false })).toBeInTheDocument();
  });
});

