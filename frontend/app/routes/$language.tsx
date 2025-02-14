import { json, redirect, Response } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import {
  createNewLanguage,
  getLanguages,
  setActiveLanguage,
} from "~/models/language.server";
import { getUser } from "~/session.server";
import styles from "~/styles/index.css";
import ErrorMessage from "~/modules/Common/components/ErrorMessage";
import MainPage from "~/pages/MainPage";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const id = form.get("id") as string;
  const newLanguage = form.get("newLanguage") as string;
  let project;
  if (newLanguage?.length > 0) {
    project = await createNewLanguage(request, newLanguage);
  } else {
    project = await setActiveLanguage(id);
  }

  return redirect(`/${project?.title}/skills`);
}

export const loader = async ({ request }: LoaderArgs) => {
  let user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  const userData = { streak: user.streak, wasToday: user.wasToday };
  const languages = await getLanguages(request);

  if (!languages) {
    throw new Response("No languages were found", { status: 404 });
  }

  const activeLanguage = languages.find((item) => item.active);

  if (!activeLanguage) {
    throw new Response(`Active language wasn't found`, { status: 404 });
  }

  // Check if we just on language page (doesn't exist), then we automatically redirect to skills list
  const onLanguagePage = request.url.split("/").at(-1) === activeLanguage.title;
  if (onLanguagePage) {
    return redirect(`/${activeLanguage.title}/skills`);
  }

  return json({ userData, languages });
};

export default function LanguagePage() {
  const { userData, languages } = useLoaderData<typeof loader>();

  return <MainPage userData={userData} languages={languages} />;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <ErrorMessage>{caught.statusText}</ErrorMessage>;
  }

  return new Error("Something went wrong in language route");
}
