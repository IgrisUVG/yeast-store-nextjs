import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import isSignedIn from "@/actions/user/is-signed-in";

export const metadata: Metadata = {
  title: "Hop & Barley",
  description: "Создать интернет-магазин с каталогом товаров, корзиной, формой заказа, авторизацией и API для управления товарами",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserSignedIn = await isSignedIn();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <header>
          <div className="header-container">
            <Link href="/" className="header__logo">
              <img src="/img/logo.svg" alt="Hop & Barley Logo" />
              <p className="logo-text">Hop & Barley</p>
            </Link>
            <nav className="header__nav">
              <ul>
                <li><Link href="/">Products</Link></li>
                <li><a href="#">Guides & Recipes</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>

            {
              isUserSignedIn
                ? <div className="header__user-actions" id="auth-user">
                  <a href="account.html" className="user-icon" aria-label="My Account">
                    <img src="/img/icons/User_alt.svg" alt="User Account" />
                  </a>
                  <a href="cart.html" className="cart-icon" aria-label="Shopping Cart">
                    <img src="/img/icons/Shopping_bag.svg" alt="Shopping Cart" />
                  </a>
                </div>
                : <div className="header__auth-buttons" id="auth-guest">
                  <Link href="/signin" className="button button--secondary">Sign in</Link>
                  <Link href="/signup" className="button button--primary">Register</Link>
                </div>
            }
          </div>
        </header>

        {children}

        <footer>
          <img src="/img/background/image-footer.svg" alt="Hop & Barley Hops Logo" className="footer__hops-logo" />
          <nav className="footer__nav">
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">License</a></li>
            </ul>
          </nav>
          <p className="footer__copyright">© Hop & Barley 2025. All rights reserved</p>
        </footer>
      </body>
    </html>
  );
}
