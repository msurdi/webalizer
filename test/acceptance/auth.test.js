import config from "../config";

describe("Authentication", () => {
  beforeAll(async () => {
    await page.goto(config.baseUrl);
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
