import { Product, ProductType } from "@/types/product";
import Link from "next/link";
import CheckboxFilter from "./components/filters/checkbox/checkbox";
import SortButton from "./components/filters/sort/sort";
import SearchInputInstant from "./components/filters/search/search-instant";

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

enum SortDirection {
  NEW = "new",
  PRICE_ASC = "price.asc",
  PRICE_DESC = "price.desc",
  RATING = "rating",
}

const SortDirectionName: readonly [SortDirection, string][] = Object.freeze([
  [SortDirection.NEW, "New"],
  [SortDirection.PRICE_ASC, "Price ascending"],
  [SortDirection.PRICE_DESC, "Price descending"],
  [SortDirection.RATING, "Rating"],
]);

const DEFAULT_SORT_DIRECTION = SortDirection.NEW;

export default async function Home({ searchParams }: PageProps<"/">) {
  const searchValues = await searchParams;

  const productsResponse = await fetch("http://localhost:3000/json/data.json", {
    method: "GET",
  });
  const products = await productsResponse.json() as Product[];

  const sortDirection = searchValues[SearchParam.SORT] ?? DEFAULT_SORT_DIRECTION;

  const filteredProducts = products
    .filter(function (p) {
      if (!(SearchParam.SEARCH in searchValues)) {
        return true;
      }

      const soughtForValue = (searchValues[SearchParam.SEARCH] as string);

      return (
        p.name.toLowerCase().includes(soughtForValue.toLowerCase()) ||
        p.tagline.toLowerCase().includes(soughtForValue.toLowerCase()) ||
        p.price.value.toString().includes(soughtForValue.toLowerCase()) ||
        p.rating.toString().includes(soughtForValue.toLowerCase())
      );
    })
    .filter(function (p) {
      if (!(SearchParam.PRODUCT_TYPE in searchValues)) {
        return true;
      }

      return searchValues[SearchParam.PRODUCT_TYPE]!.includes(p.type);
    })
    .sort(function (a, b) {
      if (sortDirection === DEFAULT_SORT_DIRECTION) {
        return 0;
      }

      if (sortDirection === SortDirection.PRICE_ASC) {
        return a.price.value - b.price.value;
      }

      if (sortDirection === SortDirection.PRICE_DESC) {
        return b.price.value - a.price.value;
      }

      if (sortDirection === SortDirection.RATING) {
        return b.rating - a.rating;
      }

      return 0;
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
          <SearchInputInstant name={SearchParam.SEARCH} />
          <div className="sort-options">{
            SortDirectionName.map(([k, v]) => <SortButton
              key={`sort-direction-control-${k}`}
              name={SearchParam.SORT}
              isDefault={k === DEFAULT_SORT_DIRECTION}
              value={k}
              label={v}
            />)
          }</div>
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
