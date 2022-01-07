import { rest } from 'msw';

const baseUrl = process.env.REACT_APP_API_URL;

const loginHandler = rest.post(`${baseUrl}/user/login`, (req, res, ctx) => {
    const msg = `[JEST] Default POST MSW mocked called with params: ${JSON.stringify(req.body)}`;
    console.log(msg);
    return res(ctx.status(200));
});

export const loginDeniedHandler = rest.post(`${baseUrl}/user/login`, (req, res, ctx) => {
    const msg = `[JEST] POST MSW mocked called with params: ${JSON.stringify(req.body)}`;
    console.log(msg);
    return res(ctx.status(400));
});

export const handlers = [
    loginHandler
]