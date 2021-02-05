import { getSession, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import ScriptList from "../components/ScriptList";
import findScripts from "../lib/core/find-scripts";
import urls from "../lib/urls";

const IndexPage = ({ scripts }) => {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { props: { session } };
  }

  const scripts = await findScripts();
  return { props: { scripts, session } };
};

export default IndexPage;
