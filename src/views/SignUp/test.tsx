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

const baseUrl = process.env.REACT_APP_API_URL;

describe("Sign up process", () => {
  test("User complete the sign up and access main page", async () => {
    //arrange
    const mainAreaHeaderTitle = getLocatedMessage(locales.EN.value, 'app-title');
    const firstNameLabel = getLocatedMessage(locales.EN.value, 'signup.first.name.label');
    const lastNameLabel = getLocatedMessage(locales.EN.value, 'signup.last.name.label');
    const emailLabel = getLocatedMessage(locales.EN.value, 'signup.email.label');
    const passwordId = "password";
    const signUpButtonLabel = "Sign Up";
    const submitButtonLabel = "Send";
    render(<App />);

    //act
    userEvent.click(
      screen.getByRole("button", { name: signUpButtonLabel })
    );

    const firstNameField = screen.getByRole("textbox", {
      name: firstNameLabel,
    });
    userEvent.type(firstNameField, "XXXXXXX");

    const lastNameField = screen.getByRole("textbox", {
      name: lastNameLabel,
    });
    userEvent.type(lastNameField, "XXXXXXX");

    const emailField = screen.getByRole("textbox", {
      name: emailLabel,
    });
    userEvent.type(emailField, "XXXXXXX");

    const passwordTexfield = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(passwordTexfield, "XXXXXXXX");

    userEvent.click(
      screen.getByRole("button", { name: submitButtonLabel })
    );

    //assert
    expect(
      await screen.findByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();

  });

  test.todo("Fail on doing sign up with incomplete form");
});

