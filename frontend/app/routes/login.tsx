import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { createUserSession, getUserId } from "~/session.server";
import { createUser, verifyLogin } from "~/models/user.server";
import Login from "~/pages/Login";
import { ActionData } from "~/pages/Login/Login";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const user = await verifyLogin(username, password);

  if (user) {
    return createUserSession({
      request,
      userId: user.id,
      redirectTo: "/",
    });
  }

  if (action === "register") {
    const newUser = await createUser(username, password);

    return await createUserSession({
      request,
      userId: newUser.id,
      redirectTo: "/",
    });
  }

  return json<ActionData>(
    {
      errors: { username: "Invalid username or password" },
      fields: { action: "login", password: "" },
    },
    { status: 400 }
  );
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  return <Login actionData={actionData} />;
}
