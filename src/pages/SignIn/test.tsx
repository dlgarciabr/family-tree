import userEvent from '@testing-library/user-event';
import { render, screen, waitFor/*, navigateToHome*/ } from 'utils/test-utils';
import { locales, getLocatedMessage } from 'utils/i18n';
import { mswServer, waitForRequest } from '__mocks__/msw-server';
import {
  deniedLoginHandler,
  failValidateTokenHandler
} from '__mocks__/msw-handlers';

import App from "App";

const baseUrl = process.env.REACT_APP_API_URL;

describe("Sign in process", () => {
  const mainAreaHeaderTitle = getLocatedMessage(locales.EN.value, 'app.title');
  const signInTitle = getLocatedMessage(locales.EN.value, 'signin.title');
  const signOutLabel = getLocatedMessage(locales.EN.value, 'signout.button.label');
  const emailLabel = "Email";
  const passwordId = "password";
  const buttonLabel = "Sign In";
  const email = "admin@mail.com";
  const password = "123456";

  test("Open login form hidding secured features", () => {
    //arrange

    //act
    render(<App />);

    //assert
    expect(screen.queryByText(mainAreaHeaderTitle)).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: signInTitle })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: emailLabel })).toBeInTheDocument();

    expect(screen.getByTestId(passwordId)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: buttonLabel })).toBeInTheDocument();
  });

  test("Fail on doing login with wrong credentials", async () => {
    //arrange
    mswServer.use(deniedLoginHandler);
    const wrongCredentialsMessage = getLocatedMessage(locales.EN.value, 'signin.wrong.credentials.message');
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/signin`);

    render(<App />);

    //act
    const emailTexfield = screen.getByRole("textbox", {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(emailTexfield, email);
    userEvent.type(passwordTexfield, password);

    userEvent.click(
      screen.getByRole("button", { name: buttonLabel })
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

    expect(screen.getByRole("heading", { name: signInTitle })).toBeInTheDocument();

    expect(
      await screen.findByText(wrongCredentialsMessage)
    ).toBeInTheDocument();
  });

  test("Success on doing login with right credentials", async () => {
    // arrange
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);

    render(<App />);

    //act
    const emailTexfield = screen.getByRole("textbox", {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(emailTexfield, email);
    userEvent.type(passwordTexfield, password);

    userEvent.click(
      screen.getByRole("button", { name: buttonLabel })
    );

    //assert
    const request = await pendingRequest;

    expect(request.body).toEqual({
      email,
      password,
    });

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: signInTitle })
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
        screen.queryByRole("heading", { name: signInTitle })
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
      await screen.findByRole("heading", { name: signInTitle })
    ).toBeInTheDocument();
  });

  test("Success on opening a secured volunteer profile page after session restored from token", async () => {
    // arrange
    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');
    const myProfileTitle = getLocatedMessage(locales.EN.value, 'myprofile.title');
    const myProfileButtonLabel = getLocatedMessage(locales.EN.value, 'myprofile.button.label');

    // act
    render(<App />);

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: signInTitle })
      ).not.toBeInTheDocument()
    );

    const link = screen.getByRole("link", { name: myProfileButtonLabel });
    userEvent.click(link);

    //assert
    expect(
      await screen.findByRole("heading", { name: myProfileTitle })
    ).toBeInTheDocument();

    //reset navigation
    // await navigateToHome();
  });

  test("Success on doing login and logout", async () => {
    // arrange
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);

    render(<App />);

    //act
    const emailTexfield = screen.getByRole("textbox", {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(emailTexfield, email);
    userEvent.type(passwordTexfield, password);

    userEvent.click(
      screen.getByRole("button", { name: buttonLabel })
    );

    //assert
    const request = await pendingRequest;

    expect(request.body).toEqual({
      email,
      password,
    });

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: signInTitle })
      ).not.toBeInTheDocument()
    );

    expect(
      await screen.findByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();

    const logout = screen.getByRole("button", { name: signOutLabel });
    userEvent.click(logout);

    expect(
      await screen.findByText(signInTitle)
    ).toBeInTheDocument();
  });

  test.todo('Open login page only if user is not logged in');

  test.todo("Fail on doing sign in with incomplete form");
});

