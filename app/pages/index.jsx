import React from "react";
import Command from "../components/Command";

const COMMANDS = [
  {
    title: "Start windows VM",
    id: "start_windows_vm",
  },
  { title: "Stop windows VM", id: "stop_windows_vm" },
];

const IndexPage = () => (
  <main>
    {COMMANDS.map((command) => (
      <Command commandId={command.id} title={command.title} />
    ))}
  </main>
);

export default IndexPage;
