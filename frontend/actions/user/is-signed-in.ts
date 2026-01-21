import "server-only";
import config from "@/types/config";
import { cookies } from "next/headers";

export default async function isSignedIn() {
  const cookieStore = await cookies();
  const isSignedIn = cookieStore.get(config.AUTH_COOKIE_NAME);

  return (
    isSignedIn !== undefined &&
    isSignedIn.value === "true"
  );
}
