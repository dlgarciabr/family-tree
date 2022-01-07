import userEvent, { TargetElement } from '@testing-library/user-event';
import { rest } from 'msw';
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
    // await new Promise((r) => setTimeout(r, 1000));

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

    // const loginDeniedHandler = rest.post(`${baseUrl}/user/login`, (req, res, ctx) => {
    //   const body = req.body as any;
    //   const msg = `[JEST] POST MSW mocked called with params: ${JSON.stringify(body)}`;
    //   console.log(msg);

    //   return res(ctx.status(400));
    // });

    mswServer.use(loginDeniedHandler);

    render(<App />);
    // await new Promise((r) => setTimeout(r, 1000));

    expect(
      screen.getByRole("heading", { name: loginTitle })
    ).toBeInTheDocument();

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
      email: email,
      password: password,
    })

    expect(screen.getByRole("heading", { name: loginTitle })).toBeInTheDocument();

    expect(
      await screen.findByText(wrongCredentialsMessage)
    ).toBeInTheDocument();
  });

  test.todo("Success on doing login with right credentials");
  // test("Success on doing login with right credentials", async () => {
  //arrange
  //   const email = "admin@mail.com";
  //   const password = "123456";
  //   const userId = 1;
  //   const token = "1234567";
  //   const enMessages = await import("../../../compiled-lang/en.json");

  //   mockAxios.get.mockImplementationOnce(() =>
  //     Promise.resolve({
  //       data: { id: userId, token: token },
  //     })
  //   );

  //   render(<App />);
  //   await new Promise((r) => setTimeout(r, 1000));

  //   expect(
  //     screen.getByRole("heading", { name: enMessages["login-title"][0].value })
  //   ).toBeInTheDocument();

  //   //act
  //   const emailTexfield = screen.getByRole("textbox", {
  //     name: enMessages["email-label"][0].value,
  //   });
  //   const passwordTexfield = screen.getByTestId("password").childNodes[1]
  //     .childNodes[0];

  //   userEvent.type(emailTexfield, email);
  //   userEvent.type(passwordTexfield, password);

  //   userEvent.click(
  //     screen.getByRole("button", {
  //       name: enMessages["signin-label"][0].value,
  //     })
  //   );

  //   //assert
  //   expect(mockAxios.get).toHaveBeenCalledTimes(1);

  //   expect(mockAxios.get).toHaveBeenCalledWith(
  //     `${process.env.REACT_APP_API_URL}/user/login`,
  //     {
  //       params: {
  //         email: email,
  //         password: password,
  //       },
  //     }
  //   );

  //   await waitFor(() =>
  //     expect(
  //       screen.queryByRole("heading", { name: "Login" })
  //     ).not.toBeInTheDocument()
  //   );
  // });
});
