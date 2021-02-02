import React, { useState } from "react";
import useRun from "../hooks/use-run";

const ScriptListItem = ({ script }) => {
  const run = useRun();

  const [output, setOutput] = useState("");

  const handleRunCommandSubmit = async (event) => {
    event.preventDefault();
    const result = await run(script.id);
    setOutput(result);
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
            className="bg-primary hover:bg-primary-light  transition-all duration-200 shadow text-white py-2 px-6 border-gray-400 rounded"
            type="submit"
          >
            Run
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
