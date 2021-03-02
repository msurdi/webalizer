import config from "../config";
import authenticate from "../helpers/authenticate";

describe("Authentication", () => {
  beforeAll(async () => {
    await authenticate(page);
    await page.goto(config.baseUrl);
  });

  it("Should list all the commands available in fixtures", async () => {
    await page.goto(config.baseUrl);
    await expect(page).toHaveText("Echo command");
    await expect(page).toHaveText("Echo description text");

    await expect(page).toHaveText("Run command");
    await expect(page).toHaveText("Run description");
  });
});
