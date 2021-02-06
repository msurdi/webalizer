import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import urls from "../../lib/urls";

const SignInPage = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef();
  const router = useRouter();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSignInSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = e.target;
    const { ok } = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setIsLoading(false);
    if (ok) {
      setHasError(false);
      router.replace(urls.home());
    } else {
      setHasError(true);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col max-w-md mx-auto mt-10 p-2">
        {hasError && (
          <p className="text-error my-4 text-center">
            Oops... wrong username or password. Try again.
          </p>
        )}
        <form className="flex flex-col" onSubmit={handleSignInSubmit}>
          <Input
            ref={usernameRef}
            id="username"
            label="Username"
            name="username"
          />
          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
          />
          <Button isLoading={isLoading} type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </Layout>
  );
};
export default SignInPage;
