import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import serverRuntimeConfig from "../../../lib/server-runtime-config";

const options = {
  providers: [
    Providers.Credentials({
      name: "Password",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!serverRuntimeConfig.username && !serverRuntimeConfig.password) {
          // No username and password configures, thus authentication is disabled and every user is 'anonymous'
          return { username: "anonymous" };
        }

        const { username, password } = credentials;

        if (
          username === serverRuntimeConfig.username &&
          password === serverRuntimeConfig.password
        ) {
          return Promise.resolve({ username });
        }
        return Promise.resolve(null);
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
