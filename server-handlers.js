// !reference taken from https://kentcdodds.com/blog/stop-mocking-fetch#then-i-discovered-msw
import { rest } from "msw";
import * as users from "./src/services/authServices";

console.log("hello handler");
const handlers = [
  rest.post("/users", async (req, res, ctx) => {
    const response = await users.registerUser(JSON.parse(req.body));
    return res(ctx.json({ response }));
  }),

  rest.post("/users/login", async (req, res, ctx) => {
    const response = await users.loginUser(JSON.parse(req.body));
    return res(ctx.json({ response }));
  }),
];

export { handlers };
