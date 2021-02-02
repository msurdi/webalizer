import React from "react";
import Layout from "../components/Layout";
import ScriptList from "../components/ScriptList";
import findScripts from "../lib/core/find-scripts";

const IndexPage = ({ scripts }) => (
  <Layout>
    <ScriptList scripts={scripts} />
  </Layout>
);

export const getServerSideProps = async () => {
  const scripts = await findScripts();
  return { props: { scripts } };
};

export default IndexPage;
