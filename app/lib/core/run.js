import execa from "execa";

const exec = async (command) => {
  try {
    const { all: output } = await execa(command, {
      shell: true,
    });
    return output;
  } catch (error) {
    return error.message;
  }
};

const run = async (command) => {
  if (command === "start_windows_vm") {
    const output = await exec('VBoxManage startvm "Windows" --type headless');
    return output;
  }
  if (command === "stop_windows_vm") {
    const output = await exec("VBoxManage controlvm Windows poweroff");
    return output;
  }
  return "unknown command";
};

export default run;
