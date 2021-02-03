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
    const { exitCode, all: output, failed } = result;
    return { exitCode, output, failed };
  } catch (error) {
    logger.error(`Command ${command} failed ${JSON.stringify(error)}`);
    return { exitCode: null, output: error.message, failed: true };
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

  return exec(script.command, { shell: !!script.shell });
};

export default run;
