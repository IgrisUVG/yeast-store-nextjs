"use server";

import "server-only";
import { CartItem } from "@/types/cart";

export default async function getCartItems() {
  const cartItemsResponse = await fetch("http://localhost:3000/json/cart.json", {
    method: "GET",
  });

  if (cartItemsResponse.status !== 200) {
    return [];
  }

  const data = await cartItemsResponse.json() as CartItem[];
  return data.map((it) => ({
    ...it,
    // NB! As cart data is static, multiplying by a random number
    // results in imitation of changing amount of products in cart
    // (even tho completely random)
    amount: Math.round(it.amount * (Math.random() + 1)),
  })) as CartItem[];
}
