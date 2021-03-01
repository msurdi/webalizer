import config from "../config";

const authenticate = async (page) => {
  await page.goto(`${config.baseUrl}/auth/signin`);
  await page.fill("#username", config.username);
  await page.fill("#password", config.password);
  await page.click("text='Sign in'");
};

export default authenticate;
