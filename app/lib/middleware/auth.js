import { getSession } from "next-auth/client";

export default async (req, res, next) => {
  const session = await getSession({ req });
  if (session) {
    req.session = session;
    return next();
  }
  return res.status(401).end();
};
