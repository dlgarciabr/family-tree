// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { cleanup, assureHomePath } from 'utils/test-utils';
import { mswServer } from './__mocks__/msw-server';
import { store } from './redux/reduxStore';
import { volunteerHubApi } from './services/volunteerHubApi';

beforeEach(() => {
  // console.info(location.href);
  // window.history.pushState({}, "", "http://localhost:3000/");
  // console.info(location.href);
  // cleanup();
  // assureHomePath();
});

beforeAll(() => {
  mswServer.listen({
    onUnhandledRequest: 'error',
    // onUnhandledRequest: 'bypass',
  })
});

afterEach(() => {
  mswServer.resetHandlers();
  store.dispatch(volunteerHubApi.util.resetApiState());
  window.sessionStorage.clear();
});

afterAll(() => {
  mswServer.close();
  // console.debug('==========================================================================================');
});

