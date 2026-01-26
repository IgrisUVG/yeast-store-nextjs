"use server";

import config from "@/types/config";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(config.AUTH_COOKIE_NAME);
  redirect("/", RedirectType.replace);
}
