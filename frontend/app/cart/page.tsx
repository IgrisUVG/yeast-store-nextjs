import isSignedIn from "@/actions/user/is-signed-in";
import { redirect, RedirectType } from "next/navigation";
import Checkout from "./components/checkout";
import getCartItems from "@/actions/cart/get-cart-items";
import getProducts from "@/actions/products/get-products";
import checkout from "@/actions/cart/checkout";

export default async function Cart() {
  const isUserSignedIn = await isSignedIn();

  if (!isUserSignedIn) {
    redirect("/signin/?returnTo=/cart", RedirectType.replace);
  }

  const cartItems = await getCartItems();
  const products = await getProducts();

  return <form action={checkout}>
    <Checkout
      cartItems={cartItems}
      products={products}
    />
  </form>;
}
