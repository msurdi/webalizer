import playwright from "playwright";
import config from "../config";

export const getAnonynousPage = async () => {
  const browser = await playwright.chromium.launch({
    headless: config.headless,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(config.baseUrl);
  return page;
};

export const getLoggedInPage = async () => {
  const page = await getAnonynousPage();
  // TODO: login
  return page;
};
