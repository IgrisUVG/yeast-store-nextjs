"use server";

import config from "@/types/config";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import "server-only";

export default async function signIn(currentErrors: string[], formData: FormData) {
  const email = formData.get("email")! as string;
  const password = formData.get("password")! as string;

  await new Promise((res) => setTimeout(res,3000))

  if (email !== "admin@gmail.com" && password !== "123") {
    return [
      ...currentErrors,
      "Incorrect username or password.",
    ];
  }

  const cookieStore = await cookies();
  cookieStore.set(config.AUTH_COOKIE_NAME, "true");

  const returnTo = formData.get("return-to") as string | null;
  redirect(returnTo === null || returnTo.trim() === "" ? "/" : returnTo, RedirectType.replace);
}
