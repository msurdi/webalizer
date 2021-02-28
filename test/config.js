import path from "path";

const port = process.env.PORT || 3001;

const config = {
  fixturesRoot: path.join(__dirname, "fixtures"),
  port,
  baseUrl: process.env.BASE_URL || `http://localhost:${port}`,
  username: process.env.USERNAME || "test_user",
  password: process.env.PASSWORD || "test_password",
};
export default config;
