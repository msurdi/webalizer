import config from "../config";
import getPage from "../helpers/page";

describe("Authentication", () => {
  /** @type {import('playwright').Page} */
  let page;

  beforeAll(async () => {
    page = await getPage();
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
