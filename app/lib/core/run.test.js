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
    let output;
    beforeEach(async () => {
      output = await run("echo.json");
    });

    it("Returns the script output", () => {
      expect(output).toEqual("test output");
    });

    it("Executes the command for the given script id", async () => {
      expect(execa).toHaveBeenCalledWith("./script.sh", {
        all: true,
        shell: true,
      });
    });

    it("Logs the name of the script run", async () => {
      expect(logger.log).toHaveBeenCalledWith("Running command ./script.sh");
    });

    it("Logs the output of the script run", async () => {
      expect(logger.log).toHaveBeenCalledWith(
        'Command ./script.sh finished {"all":"test output"}'
      );
    });
  });
});
