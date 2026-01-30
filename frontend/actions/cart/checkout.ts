"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

async function removeFromCart(id: string, all: boolean = false) {
  console.log(`REMOVING FROM CART ${all ? "ALL ITEMS" : "ONE ITEM"} OF PRODUCT WITH ID:`, id);
}

async function addToCart(id: string) {
  console.log("ADDING ONE ITEM OF:", id);
}

export default async function checkout(formData: FormData) {
  if (formData.get("descrease-amount") !== null) {
    removeFromCart(formData.get("descrease-amount") as string);
    revalidatePath("/cart");
    return;
  }

  if (formData.get("increase-amount") !== null) {
    addToCart(formData.get("increase-amount") as string);
    revalidatePath("/cart");
    return;
  }

  if (formData.get("remove-from-cart") !== null) {
    removeFromCart(formData.get("remove-from-cart") as string, true);
    revalidatePath("/cart");
    return;
  }

  if (formData.get("process-payment") !== null) {
    console.log("PROCESSING PAYMENT");
    console.log(formData);
    await new Promise((res) => setTimeout(res, 3000));
    redirect("/account", RedirectType.replace);
  }

  return;
}
