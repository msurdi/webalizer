import getConfig from "next/config";
import findScripts from "./find-scripts";

jest.mock("next/config");

describe("find-script", () => {
  let scripts;

  beforeAll(async () => {
    getConfig.mockImplementation(() => ({
      serverRuntimeConfig: { scriptsRoot: "fixtures/configs" },
    }));
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
        command: "echo this is the command output",
        description: "Echo description text",
        button: "Echo button",
        confirm: "Run echo?",
        id: "echo.json",
        name: "Echo command",
        shell: true,
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
