import React from "react";
import ScriptListItem from "./ScriptListItem";

const ScriptList = ({ scripts }) => (
  <ul className="divide-y divide-gray-300">
    {scripts.map((script) => (
      <li className="px-2 py-4 hover:bg-gray-100" key={script.id}>
        <ScriptListItem script={script} />
      </li>
    ))}
  </ul>
);

export default ScriptList;
