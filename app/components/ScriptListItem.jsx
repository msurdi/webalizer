import cn from "classnames";
import React, { useState } from "react";
import useRun from "../hooks/use-run";

const ScriptListItem = ({ script }) => {
  const { run, isRunning } = useRun();

  const [output, setOutput] = useState("");

  const handleRunCommandSubmit = async (event) => {
    event.preventDefault();
    const result = await run(script.id);
    setOutput(result.output);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pr-8 items-center">
        <section>
          <h1 className="font-bold">{script.name}</h1>
          <p>{script.description}</p>
        </section>
        <form onSubmit={handleRunCommandSubmit}>
          <button
            disabled={isRunning}
            className={cn(
              "shadow text-white py-2 px-6 border-gray-400 rounded",
              {
                "bg-primary hover:bg-primary-light transition-colors duration-200 ": !isRunning,
                "bg-gray-400 cursor-not-allowed": isRunning,
              }
            )}
            type="submit"
          >
            {isRunning ? "Running..." : script.button || "Run"}
          </button>
        </form>
      </div>
      {output && (
        <section className="my-4 bg-black rounded py-4 px-2">
          <pre className="font-mono text-sm text-white">{output}</pre>
        </section>
      )}
    </div>
  );
};

export default ScriptListItem;
