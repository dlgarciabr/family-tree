import { rest } from 'msw';

const baseUrl = process.env.REACT_APP_API_URL;

const successLoginHandler = rest.post(`${baseUrl}/user/signin`, (req, res, ctx) => {
  // const msg = `[successLoginHandler] MSW mocked POST called with params: ${JSON.stringify(req.body)}`;
  // console.info(msg);
  return res(
    ctx.json({
      id: 76,
      token: '1567854363452345'
    }),
    ctx.status(200)
  );
});

export const deniedLoginHandler = rest.post(`${baseUrl}/user/signin`, (req, res, ctx) => {
  // const msg = `[JEST] POST MSW mocked called with params: ${JSON.stringify(req.body)}`;
  // console.info(msg);
  return res(ctx.status(401));
});

const successValidateTokenHandler = rest.get(`${baseUrl}/user/validateToken`, (req, res, ctx) => {
  // const msg = `[successValidateTokenHandler] MSW mocked GET called with params: ${Array.from(req.url.searchParams.entries()).map(value => (value))}`;
  // console.info(msg);
  return res(
    ctx.json({
      valid: true
    }),
    ctx.status(200)
  );
});

export const failValidateTokenHandler = rest.get(`${baseUrl}/user/validateToken`, (req, res, ctx) => {
  // const msg = `[failValidateTokenHandler] MSW mocked GET called with params: ${Array.from(req.url.searchParams.entries()).map(value => (value))}`;
  // console.info(msg);
  return res(
    ctx.json({
      valid: false
    }),
    ctx.status(200)
  );
});

const successSignUpHandler = rest.post(`${baseUrl}/user/signup`, (req, res, ctx) => {
  // const msg = `[successValidateTokenHandler] MSW mocked GET called with params: ${Array.from(req.url.searchParams.entries()).map(value => (value))}`;
  // console.info(msg);
  return res(
    ctx.json({
      id: "134546"
    }),
    ctx.status(200)
  );
});

const successGetUserHandler = rest.get(`${baseUrl}/user/:id`, (req, res, ctx) => {
  // const msg = `[successGetUserHandler] MSW mocked GET called with url: ${req.url}`;
  // console.info(msg);
  return res(
    ctx.json({
      userId: "76"
    }),
    ctx.status(200)
  );
});

export const createSuccessGetUserHandlerWithParams = (responseObject: any) => {
  return rest.get(`${baseUrl}/user/:id`, (req, res, ctx) => {
    // const msg = `[successGetUserHandlerWithParams] MSW mocked GET called with url: ${req.url}`;
    // console.info(msg);
    return res(
      ctx.json(responseObject),
      ctx.status(200)
    );
  });
};

export const successHandlers = [
  successLoginHandler,
  successValidateTokenHandler,
  successSignUpHandler,
  successGetUserHandler
];