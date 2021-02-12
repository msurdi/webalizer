import cn from "classnames";
import React, { useState } from "react";
import useRun from "../hooks/use-run";
import Button, { ButtonVariant } from "./Button";

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

  const clear = () => setLastRun({});

  return (
    <div className="flex flex-col pr-1 lg:pr-4  ">
      <div className="flex justify-between flex-col lg:items-center lg:flex-row">
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
        <section>
          <div
            className={cn("my-4 bg-black rounded py-4 px-2", {
              "border-4 border-error": lastRun.failed,
              "border-4 border-success": !lastRun.failed,
            })}
          >
            <pre className="font-mono text-sm text-white overflow-auto max-h-96">
              <p>{lastRun.output}</p>
              <p
                className={cn({
                  "text-success": !lastRun.failed,
                  "text-error": lastRun.failed,
                })}
              >
                {`Exit status code: ${lastRun.exitCode}`}
              </p>
            </pre>
          </div>
          <div className="flex">
            <Button
              variant={ButtonVariant.secondary}
              className="ml-auto max-w-min"
              onClick={clear}
            >
              Clear
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default ScriptListItem;
