import execa from "execa";
import logger from "../services/logger";
import findScripts from "./find-scripts";

const exec = async (command) => {
  try {
    logger.log(`Running command ${command}`);
    const result = await execa(command, {
      all: true,
      shell: true,
    });
    logger.log(`Command ${command} finished ${JSON.stringify(result)}`);
    return result.all;
  } catch (error) {
    logger.error(`Command ${command} failed ${JSON.stringify(error)}`);
    return error.message;
  }
};

const run = async (scriptId) => {
  const scripts = await findScripts();
  const scriptToRun = scripts.find((script) => script.id === scriptId);

  if (!scriptToRun) {
    return `Script ${scriptId} not found`;
  }

  const { command } = scriptToRun;

  if (!command) {
    return `Script ${scriptId} has no command configuration`;
  }

  const output = await exec(scriptToRun.command);
  return output;
};

export default run;
