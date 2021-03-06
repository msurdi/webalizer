import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import getConfig from "next/config";

const options = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Providers.Credentials({
      name: "Password",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { serverRuntimeConfig } = getConfig();
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
