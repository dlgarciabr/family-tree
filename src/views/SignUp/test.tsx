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
  test("User complete the sign up process and access main page", () => {
    //arrange
    const nameLabel = getLocatedMessage(locales.EN.value, 'signup.name.label');
    const signUpbuttonLabel = "Sign Up";
    render(<App />);

    //act
    userEvent.click(
      screen.getByRole("button", { name: signUpbuttonLabel })
    );

    const nameField = screen.getByRole("textbox", {
      name: nameLabel,
    });

    //assert


  });
});

