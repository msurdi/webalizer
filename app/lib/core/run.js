import execa from "execa";
import logger from "../services/logger";
import findScripts from "./find-scripts";

const exec = async (command, { shell = false } = {}) => {
  try {
    logger.log(`Running command ${command}`);
    const result = await execa(command, {
      all: true,
      shell,
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
  const script = scripts.find((s) => s.id === scriptId);

  if (!script) {
    return `Script ${scriptId} not found`;
  }

  const { command } = script;

  if (!command) {
    return `Script ${scriptId} has no command configuration`;
  }

  const output = await exec(script.command, { shell: !!script.shell });
  return output;
};

export default run;
