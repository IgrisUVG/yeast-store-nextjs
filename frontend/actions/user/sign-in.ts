"use server";

import config from "@/types/config";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function signIn(formData: FormData) {
  const email = formData.get("email")! as string;
  const password = formData.get("password")! as string;

  if (email !== "admin@gmail.com" && password !== "123") {
    console.log("Error");
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(config.AUTH_COOKIE_NAME, "true");

  const returnTo = formData.get("return-to") as string | null;
  redirect(returnTo === null || returnTo.trim() === "" ? "/" : returnTo, RedirectType.replace);
}
