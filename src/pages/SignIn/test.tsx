import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, roles, navigateTo } from 'utils/test-utils';
import { locales } from 'utils/i18n';
import { mswServer, waitForRequest } from '__mocks__/msw-server';
import {
  deniedLoginHandler,
  failValidateTokenHandler
} from '__mocks__/msw-handlers';

import App from "App";
import { Routes } from 'components/AppRoutes';

const baseUrl = process.env.REACT_APP_API_URL;

describe("Sign in process", () => {
  //global arrange
  const mainAreaHeaderTitle = locales.EN.getMessage('app.title');
  const signInTitle = locales.EN.getMessage('signin.title');
  const signOutLabel = locales.EN.getMessage('signout.button.label');
  const emailLabel = locales.EN.getMessage('signin.email.label');
  const buttonLabel = locales.EN.getMessage('signin.button.label');
  const passwordId = "password";
  const email = "admin@mail.com";
  const password = "123456";

  test("Open login form hidding secured features", () => {
    //arrange

    //act
    render(<App />);

    //assert
    expect(screen.queryByText(mainAreaHeaderTitle)).not.toBeInTheDocument();

    expect(
      screen.getByRole(roles.HEADING, { name: signInTitle })
    ).toBeInTheDocument();

    expect(screen.getByRole(roles.TEXTBOX, { name: emailLabel })).toBeInTheDocument();

    expect(screen.getByTestId(passwordId)).toBeInTheDocument();

    expect(screen.getByRole(roles.BUTTON, { name: buttonLabel })).toBeInTheDocument();
  });

  test("Fail on doing login with wrong credentials", async () => {
    //arrange
    mswServer.use(deniedLoginHandler);
    const wrongCredentialsMessage = locales.EN.getMessage('signin.wrong.credentials.message');
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/signin`);

    render(<App />);

    //act
    const emailTexfield = screen.getByRole(roles.TEXTBOX, {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(emailTexfield, email);
    userEvent.type(passwordTexfield, password);

    userEvent.click(
      screen.getByRole(roles.BUTTON, { name: buttonLabel })
    );

    //assert
    const request = await pendingRequest;

    expect(request.body).toEqual({
      email,
      password,
    })

    await waitFor(() =>
      expect(
        screen.queryByRole(mainAreaHeaderTitle)
      ).not.toBeInTheDocument()
    );

    expect(screen.getByRole(roles.HEADING, { name: signInTitle })).toBeInTheDocument();

    expect(
      await screen.findByText(wrongCredentialsMessage)
    ).toBeInTheDocument();
  });

  test("Success on doing login with right credentials", async () => {
    // arrange
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);

    render(<App />);

    //act
    const emailTexfield = screen.getByRole(roles.TEXTBOX, {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(emailTexfield, email);
    userEvent.type(passwordTexfield, password);

    userEvent.click(
      screen.getByRole(roles.BUTTON, { name: buttonLabel })
    );

    //assert
    const request = await pendingRequest;

    expect(request.body).toEqual({
      email,
      password,
    });

    await waitFor(() =>
      expect(
        screen.queryByRole(roles.HEADING, { name: signInTitle })
      ).not.toBeInTheDocument()
    );

    expect(
      await screen.findByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();
  });

  test("Success on doing login with credentials from session store", async () => {
    // arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');

    //act
    render(<App />);

    //assert
    await waitFor(() =>
      expect(
        screen.queryByRole(roles.HEADING, { name: signInTitle })
      ).not.toBeInTheDocument()
    );

    expect(
      await screen.findByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();
  });

  test("Fail on doing login with invalid credentials from session storage", async () => {
    // arrange
    mswServer.use(failValidateTokenHandler);
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');

    //act
    render(<App />);

    expect(
      await screen.findByRole(roles.HEADING, { name: signInTitle })
    ).toBeInTheDocument();
  });

  test("Success on opening a secured DUMMY page after session restored from token", async () => {
    // arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const dummyTitle = 'dummy component';
    const dmmyButtonLabel = 'Show protected dummy';

    // act
    render(<App />);

    await waitFor(() =>
      expect(
        screen.queryByRole(roles.HEADING, { name: signInTitle })
      ).not.toBeInTheDocument()
    );

    const link = screen.getByRole(roles.LINK, { name: dmmyButtonLabel });
    userEvent.click(link);

    //assert
    expect(
      await screen.findByText(dummyTitle)
    ).toBeInTheDocument();
  });

  test("Success on doing login and logout", async () => {
    // arrange
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);

    render(<App />);

    //act
    const emailTexfield = screen.getByRole(roles.TEXTBOX, {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(emailTexfield, email);
    userEvent.type(passwordTexfield, password);

    userEvent.click(
      screen.getByRole(roles.BUTTON, { name: buttonLabel })
    );

    //assert
    const request = await pendingRequest;

    expect(request.body).toEqual({
      email,
      password,
    });

    await waitFor(() =>
      expect(
        screen.queryByRole(roles.HEADING, { name: signInTitle })
      ).not.toBeInTheDocument()
    );

    expect(
      await screen.findByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();

    const logout = screen.getByRole(roles.BUTTON, { name: signOutLabel });
    userEvent.click(logout);

    expect(
      await screen.findByText(signInTitle)
    ).toBeInTheDocument();
  });

  test('Show main page instead of login with active session through typing url on browser', async () => {
    //arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    render(<App />);

    //act
    await navigateTo(Routes.SIGN_IN);

    //assert
    await waitFor(() =>
      expect(
        screen.queryByRole(roles.HEADING, { name: signInTitle })
      ).not.toBeInTheDocument()
    );
  });

  test.todo("Fail on doing sign in with incomplete form");
});

