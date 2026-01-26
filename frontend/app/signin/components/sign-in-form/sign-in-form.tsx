"use client";

import signIn from "@/actions/user/sign-in";
import PendingButton from "@/components/pending-button/pending-button";
import { PropsWithChildren, useActionState } from "react";

export default function SignInForm({children}: PropsWithChildren) {
  const [errors, signInAction] = useActionState(signIn, [] as string[]);

  return <form className="auth-form" id="register-form" action={signInAction}>
    {children}

    {errors.length === 0
      ? null
      : <div className="ErrorContainer">{errors.map((e, i) => <p key={`error-${i}`}>{e}</p>)}</div>}

    <div className="InputField">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" className="Input" placeholder="Value" required />
    </div>
    <div className="InputField">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" className="Input" placeholder="Value" required />
    </div>

    <div className="CheckboxField">
      <label className="checkbox-container">Remember me
        <input type="checkbox" defaultChecked />
        <span className="checkmark"></span>
      </label>
    </div>

    <div className="ButtonGroup">
      <PendingButton
        className="button button--primary"
        pendingText={<>Signing in&hellip;</>}
      >Sign in</PendingButton>
    </div>
  </form>;
}
