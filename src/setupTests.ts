// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { mswServer } from './__mocks__/msw-server';
import { store } from './utils/reduxStore';
import { familyTreeApi } from './services/familyTreeApi';

beforeEach(() => {
  // console.info(location.href);
});

beforeAll(() => mswServer.listen({
  onUnhandledRequest: 'error',
  // onUnhandledRequest: 'bypass',
}));

afterEach(() => {
  mswServer.resetHandlers();
  store.dispatch(familyTreeApi.util.resetApiState());
  window.sessionStorage.clear();
});

afterAll(() => {
  mswServer.close();
  // console.debug('==========================================================================================');
});

