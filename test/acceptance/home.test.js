import config from "../config";
import authenticate from "../helpers/authenticate";

describe("Authentication", () => {
  beforeAll(async () => {
    await authenticate(page);
    await page.goto(config.baseUrl);
  });

  it("Should list all the commands available in fixtures", async () => {
    await page.goto(config.baseUrl);
    expect(await page.$("text='Echo'")).toBeDefined();
    expect(await page.$("text='Echo a word to a file'")).toBeDefined();

    expect(await page.$("text='Start windows VM'")).toBeDefined();
    expect(await page.$("text='Starts the windows VM'")).toBeDefined();

    expect(await page.$("text='Stop windows VM'")).toBeDefined();
    expect(await page.$("text='Stops the windows CM'")).toBeDefined();
  });
});
