"use server";

import { Product } from "@/types/product";
import "server-only";

export default async function getProducts() {
  const productsResponse = await fetch("http://localhost:3000/json/data.json", {
    method: "GET",
  });
  const products = await productsResponse.json() as Product[];
  return products;
}
