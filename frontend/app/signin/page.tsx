import isSignedIn from "@/actions/user/is-signed-in";
import signIn from "@/actions/user/sign-in";
import { redirect, RedirectType } from "next/navigation";

export default async function Page({ searchParams }: PageProps<"/signin">) {
  const userIsSignedIn = await isSignedIn();

  if (userIsSignedIn) {
    redirect("/", RedirectType.replace);
  }

  const search = await searchParams;
  const returnTo = search.returnTo ?? "/";

  return <main className="auth-page-wrapper">
    <div className="auth-background">
      <img src="/img/background/pattern.jpg" alt="Background pattern" />
    </div>
    <div className="auth-form-container">
      <div className="auth-container auth-container--register">
        <div className="Legend">
          <h1 className="auth-title">Sign in</h1>
        </div>

        <form className="auth-form" id="register-form" action={signIn}>
          <input type="hidden" name="return-to" value={returnTo} />

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
            <button type="submit" className="button button--primary">Sign in</button>
          </div>
        </form>

        <p className="auth-switch">Don&rsquo;t have an account? <a href="/signup">Register</a></p>
      </div>
    </div>
  </main>;
}
