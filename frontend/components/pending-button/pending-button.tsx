"use client";

import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SignInButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean,
  name?: string,
  pendingText?: string | ReactNode,
  type?: "submit" | "reset" | "button",
  value?: string,
};

export default function SignInButton({
  children,
  className = "",
  disabled = false,
  pendingText,
  type = "submit",
  ...rest
}: SignInButtonProps) {
  const {pending} = useFormStatus();

  return <button
    disabled={disabled || pending}
    type={type}
    className={`${className}`}
    {...rest}
  >{pending && pendingText !== undefined ? pendingText : children}</button>;
}
