import React, { useState } from "react";
import useRun from "../hooks/use-run";

const Command = ({ title, commandId }) => {
  const run = useRun();

  const [output, setOutput] = useState("");

  const handleRunCommandSubmit = async (event) => {
    event.preventDefault();
    const result = await run(commandId);
    setOutput(result);
  };

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleRunCommandSubmit}>
        <button type="submit">Run</button>
      </form>
      {output && <pre>{output}</pre>}
    </div>
  );
};

export default Command;
