import { rest } from 'msw';

const baseUrl = process.env.REACT_APP_API_URL;

export const successLoginHandler = rest.post(`${baseUrl}/user/login`, (req, res, ctx) => {
  // const msg = `[JEST] Default POST MSW mocked called with params: ${JSON.stringify(req.body)}`;
  // console.info(msg);
  return res(
    ctx.json({
      id: 4,
      token: '1567854363452345'
    }),
    ctx.status(200)
  );
});

export const deniedLoginHandler = rest.post(`${baseUrl}/user/login`, (req, res, ctx) => {
  // const msg = `[JEST] POST MSW mocked called with params: ${JSON.stringify(req.body)}`;
  // console.info(msg);
  return res(ctx.status(400));
});

export const successValidateTokenHandler = rest.get(`${baseUrl}/user/validateToken`, (req, res, ctx) => {
  // const msg = `[JEST] Default POST MSW mocked called with params: ${JSON.stringify(req.body)}`;
  // console.info(msg);
  return res(
    ctx.json({
      valid: true
    }),
    ctx.status(200)
  );
});

export const failValidateTokenHandler = rest.get(`${baseUrl}/user/validateToken`, (req, res, ctx) => {
  // const msg = `[JEST] Default POST MSW mocked called with params: ${JSON.stringify(req.body)}`;
  // console.info(msg);
  return res(
    ctx.json({
      valid: false
    }),
    ctx.status(200)
  );
});

export const handlers = []