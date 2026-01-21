import { Product } from "@/types/product";
import { redirect, RedirectType } from "next/navigation";
import Accordion from "./components/accordion/accordion";

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

  return <main className="page-product">
    <div className="container">
      <section className="product-details-section">
        <div className="product-image-container">
          <img src="/img/products/caramel_malt.jpg" alt="Caramel Malt 60L" className="product-image" />
        </div>
        <div className="product-info-column">
          <div className="product-title-price">
            <h1 className="product-name">Caramel Malt 60L</h1>
            <div className="price-section">
              <span className="price-tag">per 1 lb</span>
              <p className="product-price">$3.00</p>
            </div>
          </div>
          <div className="product-description">
            <p>Caramel Malt 60L (also known as Crystal 60L) is a versatile specialty malt that is a secret weapon for many brewers to enhance beer color, flavor, and body. It imparts a beautiful copper-amber hue to the brew.</p>
            <p>The flavor of this malt is characterized by distinct notes of caramel, toffee, and light hints of toasted bread. It adds a pleasant sweetness to the beer that beautifully balances hop bitterness and also contributes to improved head retention.</p>
            <p>Caramel Malt 60L is ideal for a wide range of styles, from Pale Ales and Amber Ales to Porters and Stouts, adding complexity and depth.</p>
          </div>
          <div className="cart-controls">
            <button className="button button--primary add-to-cart-button" id="add-to-cart-btn">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Add to Cart</span>
            </button>
            <div className="quantity-counter is-hidden" id="quantity-counter">
              <button className="quantity-btn" data-action="decrease" aria-label="Decrease quantity"><i className="fa-solid fa-minus"></i></button>
              <span className="quantity-value">1 in cart</span>
              <button className="quantity-btn" data-action="increase" aria-label="Increase quantity"><i className="fa-solid fa-plus"></i></button>
            </div>
          </div>
        </div>
      </section>

      <Accordion trigger={<h3>Technical Specifications</h3>}>
        <ul>
          <li><strong>Origin:</strong> USA / Belgium</li>
          <li><strong>Type:</strong> Crystal/Caramel Malt</li>
          <li><strong>Color (°L):</strong> 60 °L</li>
          <li><strong>Moisture:</strong> 5.0% max</li>
          <li><strong>Extract FG, Dry:</strong> 75%</li>
          <li><strong>Flavor Profile:</strong> Sweet, caramel, toffee, hints of toasted bread</li>
          <li><strong>Usage:</strong> Typically 3-15% of the grist</li>
          <li><strong>Recommended Beer Styles:</strong> Pale Ale, Amber Ale, IPA, Brown Ale, Porter, Stout, Scotch Ale</li>
        </ul>
      </Accordion>

      <section className="reviews-section">
        <h2 className="reviews-title">Latest reviews</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-rating">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <div className="review-body">
              <h4 className="review-heading">The Perfect Sweet Spot</h4>
              <p className="review-text">60L is my favorite caramel malt. It&rsquo;s not too light and not too dark. It provides the perfect balance of sweetness and caramel flavor for my Amber Ales. The color comes out just gorgeous.</p>
            </div>
            <div className="review-author">
              <img src="/img/avatars/avatar1.svg" alt="User avatar" className="author-avatar" />
              <span className="author-name">AmberAleFanatic</span>
            </div>
          </div>
          <div className="review-card">
            <div className="review-rating">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <div className="review-body">
              <h4 className="review-heading">Never Brew Without It</h4>
              <p className="review-text">I add a bit of C60 to almost every recipe. It improves head retention and gives the beer a finished quality that&rsquo;s hard to achieve otherwise. Works great in IPAs to balance the bitterness.</p>
            </div>
            <div className="review-author">
              <img src="/img/avatars/avatar2.svg" alt="User avatar" className="author-avatar" />
              <span className="author-name">BrewMore</span>
            </div>
          </div>
          <div className="review-card">
            <div className="review-rating">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <div className="review-body">
              <h4 className="review-heading">Consistent and Reliable</h4>
              <p className="review-text">The quality of this malt is always top-notch. Consistent color, wonderful aroma when crushed. If a recipe calls for Crystal 60, this is the one I always reach for. Recommended.</p>
            </div>
            <div className="review-author">
              <img src="/img/avatars/avatar3.svg" alt="User avatar" className="author-avatar" />
              <span className="author-name">ConsistentBrewer</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>;
}
