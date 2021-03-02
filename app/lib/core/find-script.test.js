import config from "../../../test/config";
import serverRuntimeConfig from "../server-runtime-config";
import findScripts from "./find-scripts";

jest.mock("../server-runtime-config", () => jest.fn());

describe("find-script", () => {
  let scripts;

  beforeAll(async () => {
    serverRuntimeConfig.scriptsRoot = `${config.fixturesRoot}/configs`;
    scripts = await findScripts();
  });

  it("Loads all available script configurations", () => {
    expect(scripts).toHaveLength(2);
  });

  it("Does not load non-json files", () => {
    const scriptConfig = scripts.find(
      (script) => script.id === "non-config.txt"
    );
    expect(scriptConfig).toBeUndefined();
  });

  describe("Echo script", () => {
    it("Can be loaded", () => {
      const scriptConfig = scripts.find((script) => script.id === "echo.json");
      expect(scriptConfig).toBeTruthy();
      expect(scriptConfig).toEqual({
        command: "echo YES",
        description: "Echo description text",
        id: "echo.json",
        name: "Echo command",
      });
    });
  });

  describe("Run script", () => {
    it("Can be loaded", () => {
      const scriptConfig = scripts.find((script) => script.id === "run.json");
      expect(scriptConfig).toBeTruthy();
      expect(scriptConfig).toEqual({
        id: "run.json",
        name: "Run command",
        description: "Run description",
        command: "./script.sh",
      });
    });
  });
});
