import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import { mswServer, waitForRequest } from '../../__mocks__/msw-server';
import {
  successLoginHandler,
  deniedLoginHandler,
  successValidateTokenHandler,
  failValidateTokenHandler
} from '../../__mocks__/msw-handlers';

import App from "../App";

// afterEach(() => {
//   jest.clearAllMocks();
// });

const baseUrl = process.env.REACT_APP_API_URL;

describe("Login process", () => {
  //global arrange
  const mainAreaHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');
  const loginTitle = getLocatedMessage(locales.EN.value, 'login.title');

  test("Open login form hidding secured features", () => {
    //arrange
    const emailLabel = "Email";
    const passwordId = "password";
    const buttonLabel = "Sign In";

    //act
    render(<App />);

    //assert
    expect(screen.queryByText("Main area")).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: loginTitle })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: emailLabel })).toBeInTheDocument();

    expect(screen.getByTestId(passwordId)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: buttonLabel })).toBeInTheDocument();
  });

  test("Fail on doing login with wrong credentials", async () => {
    //arrange
    const emailLabel = "Email";
    const passwordId = "password";
    const buttonLabel = "Sign In";
    const wrongCredentialsMessage = getLocatedMessage(locales.EN.value, 'login.wrong-credentials');
    const email = "admin@mail.com";
    const password = "123456";
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);

    mswServer.use(deniedLoginHandler);

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

    expect(screen.getByRole("heading", { name: loginTitle })).toBeInTheDocument();

    expect(
      await screen.findByText(wrongCredentialsMessage)
    ).toBeInTheDocument();
  });

  test("Success on doing login with right credentials", async () => {
    // arrange
    const emailLabel = "Email";
    const passwordId = "password";
    const buttonLabel = "Sign In";
    const email = "admin@mail.com";
    const password = "123456";
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);

    mswServer.use(successLoginHandler);

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
        screen.queryByRole("heading", { name: loginTitle })
      ).not.toBeInTheDocument()
    );

    expect(
      screen.getByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();
  });

  test("Success on doing login with credentials from session store", async () => {
    // arrange
    mswServer.use(successValidateTokenHandler);

    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');

    //act
    render(<App />);

    //assert
    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: loginTitle })
      ).not.toBeInTheDocument()
    );

    expect(
      screen.getByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();
  });

  test("Fail on doing login with invalid credentials from session storage", async () => {
    // arrange
    mswServer.use(failValidateTokenHandler);

    window.sessionStorage.setItem("credentials", '{ "id": 4, "token": "1567854363452345" }');

    //act
    render(<App />);

    //assert
    await waitFor(() =>
      expect(
        screen.queryByText(mainAreaHeaderTitle)
      ).not.toBeInTheDocument()
    );

    expect(
      await screen.findByRole("heading", { name: loginTitle })
    ).toBeInTheDocument();
  });
});
