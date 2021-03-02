import config from "../config";

describe("Authentication", () => {
  beforeAll(async () => {
    await page.goto(config.baseUrl);
  });

  it("Asks user to go to the login screen", async () => {
    await page.click("text='Please, sign in'");

    expect(await page.url()).toMatch(`${config.baseUrl}/auth`);
  });

  it("Does not log in with with empty username and password", async () => {
    await page.fill("#username", "");
    await page.fill("#password", "");
    await page.click("text='Sign in'");

    await expect(page).toHaveText("Oops...");
  });

  it("Does not log in with wrong username", async () => {
    await page.fill("#username", "wrong");
    await page.fill("#password", config.password);
    await page.click("text='Sign in'");

    await expect(page).toHaveText("Oops...");
  });

  it("Does not log in with wrong password", async () => {
    await page.fill("#username", config.username);
    await page.fill("#password", "wrong");
    await page.click("text='Sign in'");

    await expect(page).toHaveText("Oops...");
  });

  it("Logs in", async () => {
    await page.fill("#username", config.username);
    await page.fill("#password", config.password);
    await page.click("text='Sign in'");
    await page.waitForNavigation();

    expect(await page.url()).toMatch(`${config.baseUrl}/`);
    await expect(page).toHaveText("Run");
  });
});
