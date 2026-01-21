import isSignedIn from "@/actions/user/is-signed-in";
import config from "@/types/config";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

async function signIn(formData: FormData) {
  "use server";

  const cookieStore = await cookies();

  const email = formData.get("email")! as string;
  const password = formData.get("password")! as string;

  if (email !== "admin@gmail.com" && password !== "123") {
    console.log("Error");
    return;
  }

  console.log("Success");
  cookieStore.set(config.AUTH_COOKIE_NAME, "true");
  // TODO: Redirect to a specific address
  redirect("/", RedirectType.replace);
}

export default async function Page() {
  const userIsSignedIn = await isSignedIn();

  if (userIsSignedIn) {
    redirect("/", RedirectType.replace);
  }

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
