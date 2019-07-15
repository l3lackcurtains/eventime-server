import { startServer } from "../index";

beforeAll(() => {
  return startServer();
});

require("./login.test");
require("./register.test");
