import { getSession } from "next-auth/client";
import publicRuntimeConfig from "../public-runtime-config";

export default async (req, res, next) => {
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
