
import userEvent, { TargetElement } from "@testing-library/user-event";
import { render, screen, waitFor } from "../../utils/test-utils";
import { locales, getLocatedMessage } from '../../utils/i18n';
// import mockAxios from "axios";
// import {handlers} from '../../__mocks__/handlers';

import App from "../App";

// afterEach(() => {
//   jest.clearAllMocks();
// });

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
    // const enMessages = await import("../../../compiled-lang/en.json");

    // mockAxios.get.mockImplementationOnce(() =>
    //   Promise.resolve({
    //     data: {},
    //   })
    // );

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

    // expect(mockAxios.get).toHaveBeenCalledTimes(1);

    // expect(mockAxios.get).toHaveBeenLastCalledWith(
    //   `${process.env.REACT_APP_API_URL}/user/login`,
    //   {
    //     params: {
    //       email: email,
    //       password: password,
    //     },
    //   }
    // );

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
