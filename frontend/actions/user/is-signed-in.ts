import "server-only";
import config from "@/types/config";
import { cookies } from "next/headers";

export default async function isSignedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get(config.AUTH_COOKIE_NAME);

  if (token === undefined) {
    return false;
  }

  const expirationDate = cookieStore.get(config.AUTH_COOKIE_EXPIRATION_NAME) as string | undefined;

  if (expirationDate === undefined || +new Date(parseInt(expirationDate, 10)) < Date.now()) {
    return false;
  }

  return true;
}
