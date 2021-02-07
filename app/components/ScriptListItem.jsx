import cn from "classnames";
import React, { useState } from "react";
import useRun from "../hooks/use-run";
import Button from "./Button";

const ScriptListItem = ({ script }) => {
  const { run, isRunning } = useRun();

  const [lastRun, setLastRun] = useState({});

  const handleRunCommandSubmit = async (event) => {
    event.preventDefault();
    if (script.confirm) {
      const defaultConfirmationMessage = `Are you sure you want to run ${script.name}?`;
      const message =
        typeof script.confirm === "string"
          ? script.confirm
          : defaultConfirmationMessage;

      // eslint-disable-next-line no-restricted-globals,no-alert
      const confirmed = confirm(message);
      if (!confirmed) {
        return;
      }
    }
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
          <Button isLoading={isRunning}>
            {isRunning ? "Running..." : script.button || "Run"}
          </Button>
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
