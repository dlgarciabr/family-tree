import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import { locales } from '../../utils/i18n';
import { waitForRequest } from '../../__mocks__/msw-server';

import App from '../../App';

const baseUrl = process.env.REACT_APP_API_URL;

describe('Sign up process', () => {
  const mainAreaHeaderTitle = locales.EN.getMessage('app.title');
  const firstNameLabel = locales.EN.getMessage('signup.first.name.label');
  const lastNameLabel = locales.EN.getMessage('signup.last.name.label');
  const emailLabel = locales.EN.getMessage('signup.email.label');
  const passwordId = 'password';
  const confirmPasswordId = 'confirmPassword';
  const signUpButtonLabel = locales.EN.getMessage('signup.button.label');
  const submitButtonLabel = locales.EN.getMessage('default.submit.button.label');
  const backButtonLabel = locales.EN.getMessage('default.back.button.label');

  test('User complete the sign up and access main page', async () => {
    //arrange
    const pendingRequest = waitForRequest('POST', `${baseUrl}/user/signup`);
    const email = 'abc@mail.com';
    const password = 'XXXXXXXX';
    const firstName = 'XXXXXX';
    const lastName = 'XXXXXX';

    render(<App />);

    //act
    userEvent.click(
      screen.getByRole('button', { name: signUpButtonLabel })
    );

    const firstNameField = await screen.findByRole('textbox', {
      name: firstNameLabel,
    });
    const lastNameField = screen.getByRole('textbox', {
      name: lastNameLabel,
    });
    const emailField = screen.getByRole('textbox', {
      name: emailLabel,
    });
    const passwordField = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;
    const confirmPasswordField = screen.getByTestId(confirmPasswordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(firstNameField, firstName);
    userEvent.type(lastNameField, lastName);
    userEvent.type(emailField, email);
    userEvent.type(passwordField, password);
    userEvent.type(confirmPasswordField, password);

    await waitFor(async () => {
      userEvent.click(
        screen.getByRole('button', { name: submitButtonLabel })
      );
      const request = await pendingRequest;

      expect(request.body).toEqual({
        email,
        password,
        firstName,
        lastName,
        confirmPassword: password
      });
    });

    //assert
    expect(
      await screen.findByText(mainAreaHeaderTitle)
    ).toBeInTheDocument();
  }, 7000);

  test('Fail on doing sign up with incomplete form', async () => {
    //arrange
    const firstNameRequiredMessage = locales.EN.getMessage('signup.first.name.required.message');
    const lastNameRequiredMessage = locales.EN.getMessage('signup.last.name.required.message');
    const emailRequiredMessage = locales.EN.getMessage('signup.email.required.message');
    const passwordRequiredMessage = locales.EN.getMessage('signup.password.required.message');
    const confirmPasswordRequiredMessage = locales.EN.getMessage('signup.confirmPassword.required.message');

    render(<App />);

    //act
    userEvent.click(
      screen.getByRole('button', { name: signUpButtonLabel })
    );

    //TODO: expect sign up screen to be shown

    userEvent.click(
      screen.getByRole('button', { name: submitButtonLabel })
    );

    //assert
    expect(
      await screen.findByText(firstNameRequiredMessage)
    ).toBeInTheDocument();

    expect(
      screen.getByText(lastNameRequiredMessage)
    ).toBeInTheDocument();

    expect(
      screen.getByText(emailRequiredMessage)
    ).toBeInTheDocument();

    expect(
      screen.getByText(passwordRequiredMessage)
    ).toBeInTheDocument();

    expect(
      screen.getByText(confirmPasswordRequiredMessage)
    ).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: backButtonLabel });
    userEvent.click(backButton);
  });

  test('Fail on doing sign up with wrong email field', async () => {
    //arrange
    const email = 'XXXXXXXXX';
    const emailInvalidMessage = locales.EN.getMessage('signup.email.invalid.message');

    render(<App />);

    //act
    userEvent.click(
      screen.getByRole('button', { name: signUpButtonLabel })
    );

    const emailField = await screen.findByRole('textbox', {
      name: emailLabel,
    });
    userEvent.type(emailField, email);

    userEvent.click(
      screen.getByRole('button', { name: submitButtonLabel })
    );

    //assert
    expect(
      await screen.findByText(emailInvalidMessage)
    ).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: backButtonLabel });
    userEvent.click(backButton);
  });

  test('Fail on doing sign up with wrong password confirmation field', async () => {
    //arrange
    const password = 'xxxxxxxx';
    const passwordNotMatchMessage = locales.EN.getMessage('signup.confirmPassword.not.match.message');

    render(<App />);

    //act
    userEvent.click(
      screen.getByRole('button', { name: signUpButtonLabel })
    );

    const passwordField = screen.getByTestId(passwordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(passwordField, password);

    const confirmPasswordField = screen.getByTestId(confirmPasswordId).childNodes[1]
      .childNodes[0] as Element;

    userEvent.type(confirmPasswordField, 'aaaaaaaa');

    userEvent.click(
      screen.getByRole('button', { name: submitButtonLabel })
    );

    //assert
    expect(
      await screen.findByText(passwordNotMatchMessage)
    ).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: backButtonLabel });
    userEvent.click(backButton);
  });
});

