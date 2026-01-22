"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function SignInButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const returnURL = `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ``}`;

  return <Link
    href={`/signin?returnTo=${encodeURIComponent(returnURL)}`}
    className="button button--secondary"
  >Sign in</Link>;
}
