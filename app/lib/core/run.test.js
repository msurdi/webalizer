import execa from "execa";
import logger from "../services/logger";
import findScripts from "./find-scripts";
import run from "./run";

jest.mock("../services/logger");
jest.mock("./find-scripts", () => jest.fn());
jest.mock("execa", () => jest.fn());

describe("run", () => {
  beforeEach(() => {
    findScripts.mockImplementation(() => [
      { id: "echo.json", command: "./script.sh" },
    ]);
    execa.mockImplementation(() => ({
      all: "test output",
      exitCode: 0,
      failed: false,
    }));
  });

  describe("Running a script from a script configuration file", () => {
    it("Returns the script output", async () => {
      const output = await run("echo.json");

      expect(output).toEqual({
        output: "test output",
        exitCode: 0,
        failed: false,
      });
    });

    it("Executes the command for the given script id", async () => {
      await run("echo.json");

      expect(execa).toHaveBeenCalledWith("./script.sh", {
        all: true,
        shell: false,
        timeout: 60000,
      });
    });

    it("Logs the name of the script run", async () => {
      await run("echo.json");

      expect(logger.log).toHaveBeenCalledWith("Running command ./script.sh");
    });

    it("Logs the output of the script run", async () => {
      await run("echo.json");

      expect(logger.log).toHaveBeenCalledWith(
        'Command ./script.sh finished {"all":"test output","exitCode":0,"failed":false}'
      );
    });

    it("Overrides default timeout when one is configured", async () => {
      findScripts.mockImplementation(() => [
        { id: "echo.json", command: "./script.sh", timeout: 1000 },
      ]);

      await run("echo.json");

      expect(execa).toHaveBeenCalledWith("./script.sh", {
        all: true,
        shell: false,
        timeout: 1000,
      });
    });

    it("Uses default timeout when not configured", async () => {
      findScripts.mockImplementation(() => [
        { id: "echo.json", command: "./script.sh" },
      ]);

      await run("echo.json");

      expect(execa).toHaveBeenCalledWith("./script.sh", {
        all: true,
        shell: false,
        timeout: 60000,
      });
    });

    describe.each([
      // [shell, expectedShell]
      [true, true],
      [false, false],
      [undefined, false],
      [null, false],
      ["", false],
    ])("When running a script with shell = %p", (shell, expectedShell) => {
      beforeEach(() => {
        findScripts.mockImplementation(() => [
          { id: "echo.json", command: "./script2.sh", shell },
        ]);
        execa.mockImplementation(() => ({ all: "test output" }));
      });

      it(`Executes the command ${
        expectedShell ? "with" : "without"
      } a shell`, async () => {
        await run("echo.json");

        expect(execa).toHaveBeenCalledWith("./script2.sh", {
          all: true,
          shell: expectedShell,
          timeout: 60000,
        });
      });
    });
  });
});
