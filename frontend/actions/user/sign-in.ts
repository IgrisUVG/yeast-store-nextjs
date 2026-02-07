"use server";

import config from "@/types/config";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import "server-only";

export default async function signIn(currentErrors: string[], formData: FormData) {
  const email = formData.get("email")! as string;
  const password = formData.get("password")! as string;

  const loginResponse = await fetch(`${process.env.AUTH_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  });

  if (loginResponse.status === 404) {
    return ["Cannot find user with provided email"];
  }

  if (loginResponse.status === 401) {
    return ["Incorrect password"];
  }

  if (![200, 201].includes(loginResponse.status)) {
    return ["Authorization error. Please try again later or contact support"];
  }

  const cookieStore = await cookies();
  cookieStore.set(config.AUTH_COOKIE_NAME, "true");

  const returnTo = formData.get("return-to") as string | null;
  redirect(returnTo === null || returnTo.trim() === "" ? "/" : returnTo, RedirectType.replace);
}
