import { useTransition, Form } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import ErrorMessage from "~/modules/Common/components/ErrorMessage";
import {
  LoginContainer,
  LoginContinerInner,
  LoginTitle,
  LoginToggle,
  LoginInput,
  LoginButton,
} from "./lib";

export type ActionData = {
  errors?: {
    username?: string;
    password?: string;
  };
  fields?: {
    action: string;
    password: string;
  };
};

export default function Login({
  actionData,
}: {
  actionData: ActionData | undefined;
}) {
  const transition = useTransition();

  const [isLogin, setIsLogin] = useState(
    actionData && actionData?.fields?.action === "login"
      ? true
      : !actionData
      ? true
      : false
  );

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    }
    if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  const isLoginning = transition.submission?.formData.get("action") === "login";
  const isRegistering =
    transition.submission?.formData.get("action") === "register";
  const submitLoginText = isLoginning ? "Signing in..." : "Sign in";
  const submitRegisterText = isRegistering ? "Signing up..." : "Sign up";

  return (
    <LoginContainer>
      <LoginContinerInner>
        <Form method="post" style={{ width: "100%", maxWidth: 375 }}>
          <LoginTitle>{isLogin ? "Login" : "Register"}</LoginTitle>
          <LoginToggle htmlFor="register" style={{ zIndex: isLogin ? 1 : -1 }}>
            <input
              type="radio"
              name="action"
              id="register"
              value="register"
              onChange={() => setIsLogin(!isLogin)}
              style={{ visibility: "hidden", position: "absolute" }}
              checked={!isLogin}
            />
            {isLogin ? "Sign up" : "Sign in"}
          </LoginToggle>
          <LoginToggle htmlFor="login" style={{ zIndex: !isLogin ? 1 : -1 }}>
            <input
              type="radio"
              name="action"
              id="login"
              value="login"
              onChange={() => setIsLogin(!isLogin)}
              style={{ visibility: "hidden", position: "absolute" }}
              checked={isLogin}
            />
            {isLogin ? "Sign up" : "Sign in"}
          </LoginToggle>
          <div style={{ marginTop: 8 }}>
            <LoginInput
              type="text"
              name="username"
              placeholder="Username"
              ref={usernameRef}
              id="username"
              autoFocus={true}
              required
            />

            <LoginInput
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />

            {actionData?.errors?.username && (
              <ErrorMessage role="alert" id="username-error">
                {actionData.errors.username}
              </ErrorMessage>
            )}
          </div>
          <div style={{ height: 50, marginTop: 20 }}>
            <LoginButton type="submit">
              {isLogin ? submitLoginText : submitRegisterText}
            </LoginButton>
          </div>
        </Form>
      </LoginContinerInner>
    </LoginContainer>
  );
}
