import Link from "next/link";
import React from "react";
import urls from "../lib/urls";

const Layout = ({ children }) => (
  <>
    <nav className="bg-primary text-white text-xl font-bold p-2 shadow">
      <Link href={urls.home()}>Webalizer</Link>
    </nav>
    <main>{children}</main>
  </>
);

export default Layout;
