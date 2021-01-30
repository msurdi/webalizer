const { default: urls } = require("../lib/urls");

const useRun = () => {
  const run = async (commandId) => {
    const response = await fetch(urls.run(commandId), {
      method: "POST",
      body: JSON.stringify({ command: commandId }),
      headers: { "Content-Type": "application/json" },
    });

    const responsePayload = await response.json();
    const { output } = responsePayload;
    return output;
  };

  return run;
};

export default useRun;
