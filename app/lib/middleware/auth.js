import { getSession } from "next-auth/client";
import getConfig from "next/config";

export default async (req, res, next) => {
  const { publicRuntimeConfig } = getConfig();
  const { isAuthEnabled } = publicRuntimeConfig;

  if (!isAuthEnabled) {
    return next();
  }

  const session = await getSession({ req });
  if (session) {
    req.session = session;
    return next();
  }
  return res.status(401).end();
};
