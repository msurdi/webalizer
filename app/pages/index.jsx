import React from "react";
import Command from "../components/Command";
import findScripts from "../lib/core/find-scripts";

const IndexPage = ({ scripts }) => (
  <main>
    {scripts.map((command) => (
      <Command key={command.id} commandId={command.id} title={command.name} />
    ))}
  </main>
);

export const getServerSideProps = async () => {
  const scripts = await findScripts();
  return { props: { scripts } };
};

export default IndexPage;
