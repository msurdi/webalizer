import playwright from "playwright";
import config from "../config";

const getPage = async () => {
  const browser = await playwright.chromium.launch({
    headless: config.headless,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(config.baseUrl);
  return page;
};

export default getPage;
