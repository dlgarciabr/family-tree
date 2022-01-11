import userEvent, { TargetElement } from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import { locales, getLocatedMessage } from '../../utils/i18n';
import { mswServer, waitForRequest } from '../../__mocks__/msw-server';
import { loginDeniedHandler } from '../../__mocks__/msw-handlers';
// import mockAxios from "axios";
// import {handlers} from '../../__mocks__/handlers';

import App from "../App";

// afterEach(() => {
//   jest.clearAllMocks();
// });

const baseUrl = process.env.REACT_APP_API_URL;

describe("Login process", () => {
  test("Open login form hidding secured features", () => {
    //arrange
    const loginTitle = getLocatedMessage(locales.EN.value, 'login.title');
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

    expect(screen.queryByRole("textbox", { name: emailLabel })).toBeInTheDocument();

    expect(screen.queryByTestId(passwordId)).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: buttonLabel })).toBeInTheDocument();
  });

  test("Fail on doing login with wrong credentials", async () => {
    //arrange
    const loginTitle = getLocatedMessage(locales.EN.value, 'login.title');
    const emailLabel = "Email";
    const passwordId = "password";
    const buttonLabel = "Sign In";
    const wrongCredentialsMessage = getLocatedMessage(locales.EN.value, 'login.wrong-credentials');
    const email = "admin@mail.com";
    const password = "123456";
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);

    mswServer.use(loginDeniedHandler);

    render(<App />);

    //act
    const emailTexfield = screen.getByRole("textbox", {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as TargetElement;

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

    expect(screen.getByRole("heading", { name: loginTitle })).toBeInTheDocument();

    expect(
      await screen.findByText(wrongCredentialsMessage)
    ).toBeInTheDocument();
  });

  test("Success on doing login with right credentials", async () => {
    // arrange
    const loginTitle = getLocatedMessage(locales.EN.value, 'login.title');
    const mainAreaHeaderTitle = await getLocatedMessage(locales.EN.value, 'app-title');
    const emailLabel = "Email";
    const passwordId = "password";
    const buttonLabel = "Sign In";
    const email = "admin@mail.com";
    const password = "123456";
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/login`);
    //   const userId = 1;
    //   const token = "1234567";

    render(<App />);

    //act
    const emailTexfield = screen.getByRole("textbox", {
      name: emailLabel,
    });
    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as TargetElement;

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
      screen.queryByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();
  });
});
