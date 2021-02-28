import playwright from "playwright";
import config from "../config";

describe("Authentication", () => {
  /** @type {import('playwright').Browser} */
  let browser;

  /** @type {import('playwright').BrowserContext} */
  let context;

  /** @type {import('playwright').Page} */
  let page;

  beforeAll(async () => {
    browser = await playwright.chromium.launch({ headless: config.headless });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(config.baseUrl);
  });

  afterAll(async () => {
    await browser.close();
  });

  it("Asks user to go to the login screen", async () => {
    await page.click("text='Please, sign in'");

    expect(await page.url()).toMatch(`${config.baseUrl}/auth`);
  });

  it("Logs in", async () => {
    await page.fill("#username", config.username);
    await page.fill("#password", config.password);
    await page.click("text='Sign in'");

    expect(await page.url()).toMatch(`${config.baseUrl}/`);
    expect(await page.$("text='Run'")).toBeDefined();
  });
});
