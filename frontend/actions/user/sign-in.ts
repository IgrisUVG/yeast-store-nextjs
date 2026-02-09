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

  if (![200].includes(loginResponse.status)) {
    return ["Authorization error. Please try again later or contact support"];
  }

  // 1. User has to be deleted
  // 2. User wants to interrupt his own session

  // Sessions
  // - MAC OS: Saint Petersburg 8.02.2026 [x]
  // - iPhone: Saint Petersburg 3.02.2026 [x]

  // Token:
  // - [ ] Unique
  // - [x] Server Generated
  // - [~] Server Comfirmed (Periodically)
  // - [~] Expirable

  // - [ ] Refresh Token

  const responseData = await loginResponse.json() as {
    token: string,
    expirationDate: number,
  };

  const cookieStore = await cookies();
  cookieStore.set(config.AUTH_COOKIE_NAME, responseData.token);
  cookieStore.set(config.AUTH_COOKIE_EXPIRATION_NAME, responseData.expirationDate.toString());

  const returnTo = formData.get("return-to") as string | null;
  redirect(returnTo === null || returnTo.trim() === "" ? "/" : returnTo, RedirectType.replace);
}
