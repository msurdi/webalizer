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
    execa.mockImplementation(() => ({ all: "test output" }));
  });

  describe("Running a script from a script configuration file", () => {
    it("Returns the script output", async () => {
      const output = await run("echo.json");

      expect(output).toEqual("test output");
    });

    it("Executes the command for the given script id", async () => {
      await run("echo.json");

      expect(execa).toHaveBeenCalledWith("./script.sh", {
        all: true,
        shell: false,
      });
    });

    it("Logs the name of the script run", async () => {
      await run("echo.json");

      expect(logger.log).toHaveBeenCalledWith("Running command ./script.sh");
    });

    it("Logs the output of the script run", async () => {
      await run("echo.json");

      expect(logger.log).toHaveBeenCalledWith(
        'Command ./script.sh finished {"all":"test output"}'
      );
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
        });
      });
    });
  });
});
