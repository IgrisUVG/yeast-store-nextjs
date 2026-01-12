import { Product, ProductType } from "@/types/product";
import Link from "next/link";
import CheckboxFilter from "./components/filters/checkbox/checkbox";

export enum SearchParam {
  PRODUCT_TYPE = "product-type[]",
  SEARCH = "search",
  SORT = "sort",
}

export const ProductTypeName: readonly [ProductType, string][] = Object.freeze([
  [ProductType.HOP, "Hops"],
  [ProductType.MALT, "Malts"],
  [ProductType.YEAST, "Yeasts"],
  [ProductType.ADJUNCT, "Adjunct"],
]);

export default async function Home({ searchParams }: PageProps<"/">) {
  const searchValues = await searchParams;

  const productsResponse = await fetch("http://localhost:3000/json/data.json", {
    method: "GET",
  });
  const products = await productsResponse.json() as Product[];
  const filteredProducts = products.filter(function (p) {
    if (SearchParam.PRODUCT_TYPE in searchValues) {
      return searchValues[SearchParam.PRODUCT_TYPE]!.includes(p.type);
    }

    return true;
  });

  return <>
    <section className="hero-banner">
      <img src="/img/background/hopfen-fields.jpg" alt="Beautiful hops on a dark background" className="hero-banner__image" />
      <div className="hero-banner__overlay"></div>
    </section>

    <div className="container main-content-grid">
      <aside className="sidebar filter-menu">
        <div className="sidebar__section">
          <h3 className="section-title">Product Type</h3>
          <div className="checkbox-group">{
            ProductTypeName.map(([k, v]) => <CheckboxFilter
              key={`filter-product-type-${k}`}
              name={SearchParam.PRODUCT_TYPE}
              value={k}
              label={v}
            />)
          }</div>
        </div>
      </aside>

      <section className="products-area product-grid-section">
        <div className="search-sort-bar">
          <div className="search-input-wrapper">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-button" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="sort-options">
            <button className="sort-button active-sort">New</button>
            <button className="sort-button">Price ascending</button>
            <button className="sort-button">Price descending</button>
            <button className="sort-button">Rating</button>
          </div>
        </div>

        <div className="product-grid">
          {
            filteredProducts.length === 0
              ? <div className="flex items-center justify-center flex-1 mt-20 mw-full">
                <p className="text-center text-gray-500">There are no products satisfying your request. Try to ease up your request by selecting less demading filters.</p>
              </div>
              : filteredProducts.map((p) => <Link key={p.id} href={`/products/${p.id}`} className="product-card-link">
                <div className="product-card">
                  <img src={p.image} alt={p.name} className="product-card__image" />
                  <div className="product-card__info">
                    <h4 className="product-card__name">{p.name}</h4>
                    <p className="product-card__price">{new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: p.price.currency,
                    }).format(p.price.value)}</p>
                    <p className="product-card__description">{p.tagline}</p>
                  </div>
                </div>
              </Link>)
          }
        </div>
      </section>
    </div>
  </>;
}
