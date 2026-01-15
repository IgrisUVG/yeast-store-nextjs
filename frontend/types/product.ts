export enum ProductType {
  HOP = "hop",
  MALT = "malt",
  YEAST = "yeast",
  ADJUNCT = "adjunct",
}

export interface Product {
  id: string,
  image:  string,
  name: string,
  price: {
    value: number,
    currency: "USD" | "EUR",
  },
  tagline: string,
  type: ProductType,
  rating: number,
}
