import { getSession } from "next-auth/client";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import ScriptList from "../components/ScriptList";
import findScripts from "../lib/core/find-scripts";
import serialize from "../lib/serialize";
import urls from "../lib/urls";

const IndexPage = ({ scripts, session, isAuthEnabled }) => {
  if (isAuthEnabled && !session) {
    return (
      <Layout>
        <div className="flex w-full mt-20 justify-center">
          <Link href={urls.signIn()}>
            <a className="underline text-primary font-bold">Please, sign in</a>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScriptList scripts={scripts} />
    </Layout>
  );
};

const getScriptBasicInfo = ({ id, name, description, button, confirm }) => ({
  id,
  name,
  description,
  button,
  confirm,
});

export const getServerSideProps = async (context) => {
  const { publicRuntimeConfig } = getConfig();
  const { isAuthEnabled } = publicRuntimeConfig;
  const session = await getSession(context);

  if (isAuthEnabled && !session) {
    return { props: { session, isAuthEnabled } };
  }
  const scripts = await findScripts();
  const scriptsBasicInfo = scripts.map(getScriptBasicInfo);
  return {
    props: serialize({ scripts: scriptsBasicInfo, session, isAuthEnabled }),
  };
};

export default IndexPage;
