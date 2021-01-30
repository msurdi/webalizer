import execa from "execa";
import findScripts from "./findScripts";

const exec = async (command) => {
  try {
    const { all: output } = await execa(command, {
      all: true,
      shell: true,
    });
    return output;
  } catch (error) {
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
