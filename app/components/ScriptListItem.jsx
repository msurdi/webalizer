import cn from "classnames";
import React, { useState } from "react";
import useRun from "../hooks/use-run";

const ScriptListItem = ({ script }) => {
  const { run, isRunning } = useRun();

  const [lastRun, setLastRun] = useState({});

  const handleRunCommandSubmit = async (event) => {
    event.preventDefault();
    const result = await run(script.id);
    setLastRun(result);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pr-1 flex-col lg:pr-8  lg:items-center lg:flex-row">
        <section className="my-4 lg:my-2">
          <h1 className="font-bold">{script.name}</h1>
          <p>{script.description}</p>
        </section>
        <form onSubmit={handleRunCommandSubmit}>
          <button
            disabled={isRunning}
            className={cn(
              "shadow text-white py-2 px-6 border-gray-400 rounded w-full",
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
      {lastRun.output && (
        <section
          className={cn("my-4 bg-black rounded py-4 px-2", {
            "border-4 border-error": lastRun.failed,
            "border-4 border-success": !lastRun.failed,
          })}
        >
          <pre className="font-mono text-sm text-white overflow-auto max-h-96">
            {lastRun.output}
          </pre>
        </section>
      )}
    </div>
  );
};

export default ScriptListItem;
