import { useState } from "react";

const { default: urls } = require("../lib/urls");

const useRun = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const run = async (commandId) => {
    setIsRunning(true);
    setError(null);

    try {
      const response = await fetch(urls.run(commandId), {
        method: "POST",
        body: JSON.stringify({ command: commandId }),
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    } catch (err) {
      setError(err);
    } finally {
      setIsRunning(false);
    }
    return {};
  };

  return { run, isRunning, error };
};

export default useRun;
