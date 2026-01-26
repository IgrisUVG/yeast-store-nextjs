"use client";

import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SignInButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean,
  type?: "submit" | "reset" | "button",
  pendingText?: string | ReactNode,
};

export default function SignInButton({
  children,
  className = "",
  disabled = false,
  type = "submit",
  pendingText,
}: SignInButtonProps) {
  const {pending} = useFormStatus();

  return <button
    disabled={disabled || pending}
    type={type}
    className={`${className}`}
  >{pending && pendingText !== undefined ? pendingText : children}</button>;
}
