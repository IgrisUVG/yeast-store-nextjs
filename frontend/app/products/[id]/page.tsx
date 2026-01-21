import { Product } from "@/types/product";
import { redirect, RedirectType } from "next/navigation";

export default async function Page({ params }: PageProps<"/products/[id]">) {
  const pageParams = await params;
  const productID = pageParams.id;

  const productsResponse = await fetch("http://localhost:3000/json/data.json", {
    method: "GET",
  });
  const products = await productsResponse.json() as Product[];
  const productToRender = products.find((p) => p.id === productID);

  if (productToRender === undefined) {
    redirect("/404", RedirectType.replace);
  }

  return <>
    <pre>{JSON.stringify(productToRender)}</pre>
  </>;
}
