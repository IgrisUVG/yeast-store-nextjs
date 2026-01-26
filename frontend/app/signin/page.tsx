import isSignedIn from "@/actions/user/is-signed-in";
import { redirect, RedirectType } from "next/navigation";
import SignInForm from "./components/sign-in-form/sign-in-form";

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

        <SignInForm>
          <input type="hidden" name="return-to" value={returnTo} />
        </SignInForm>

        <p className="auth-switch">Don&rsquo;t have an account? <a href="/signup">Register</a></p>
      </div>
    </div>
  </main>;
}
