"use client";

import PendingButton from "@/components/pending-button/pending-button";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import Link from "next/link";
import { createContext, useContext, useState } from "react";

const ProductsContext = createContext<{
  cartItems: CartItem[],
  products: Product[],
}>({
  cartItems: [],
  products: [],
});

function getProductById(products: Product[], id: string) {
  return products.find((p) => p.id === id);
}

interface CartFormProps {
  submitAction?: () => void,
}

function CartForm({
  submitAction = () => { },
}: CartFormProps) {
  const {
    cartItems,
    products
  } = useContext(ProductsContext);

  return <main className="cart-page-wrapper">
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0
        ? <div style={{
          "alignItems": "center",
          "display": "flex",
          "flexDirection": "column",
          "justifyContent": "center",
          "gap": "20px",
          "textAlign": "center",
        }}>
          <p>Cart is empty</p>
          <p><Link href="/products" className="button button--primary" style={{
            "padding": "10px 20px",
          }}>Buy some products</Link></p>
        </div>
        : <div className="cart-items-list" id="cart-items-list">
          {cartItems.map((it) => <div key={`cart-item-${it.id}`} className="cart-item" data-price="5.99">
            <img src={getProductById(products, it.id)!.image} alt={getProductById(products, it.id)!.name} className="cart-item__image" />
            <div className="cart-item__body">
              <div className="cart-item__details">
                <h2 className="cart-item__name">{getProductById(products, it.id)!.name}</h2>
                <div className="cart-item__price-info">
                  <p className="cart-item__price" data-item-total-price>{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: getProductById(products, it.id)!.price.currency,
                  }).format(getProductById(products, it.id)!.price.value * it.amount)}</p>
                  <span className="cart-item__price-tag">per 100g</span>
                </div>
              </div>
              <div className="cart-item__actions">
                <div className="cart-item__quantity-selector">
                  <PendingButton
                    disabled={it.amount === 1}
                    type="submit"
                    className="quantity-btn-cart"
                    data-action="decrease"
                    name="descrease-amount"
                    value={it.id}
                  ><i className="fa-solid fa-minus"></i></PendingButton>
                  <span className="quantity-value-cart">{it.amount}</span>
                  <PendingButton
                    className="quantity-btn-cart"
                    data-action="increase"
                    name="increase-amount"
                    value={it.id}
                  ><i className="fa-solid fa-plus"></i></PendingButton>
                </div>
                <PendingButton
                  className="button--remove"
                  data-action="remove"
                  name="remove-from-cart"
                  value={it.id}
                >
                  Remove <i className="fa-solid fa-xmark"></i>
                </PendingButton>
              </div>
            </div>
          </div>)}
        </div>}

      {cartItems.length === 0
        ? null
        : <div className="cart-summary">
          <div className="cart-summary__total">
            <p>Total</p>
            <p id="cart-total-price">{new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(cartItems.reduce(
              (acc, it) => acc + getProductById(products, it.id)!.price.value * it.amount, 0)
            )}</p>
          </div>
          <button
            disabled={cartItems.length === 0}
            onClick={submitAction}
            type="button"
            className="button button--primary button--checkout"
          >Proceed to Checkout</button>
        </div>
      }
    </div>
  </main>;
}

function CheckoutForm() {
  const {
    cartItems,
    products
  } = useContext(ProductsContext);

  return <main className="checkout-page-wrapper">
    {cartItems.map((ci) => <input key={`product-id-${ci.id}`} type="hidden" name="product-ids[]" value={ci.id} />)}
    {cartItems.map((ci) => <input key={`product-amount-${ci.id}`} type="hidden" name="product-amount[]" value={ci.amount} />)}

    <div className="checkout-container">
      <h1 className="checkout-title">Order Details</h1>

      <div id="checkout-form">
        <section className="checkout-section">
          <h2 className="checkout-section__title">Shipping information</h2>
          <div className="checkout-form-group">
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" name="full_name" className="Input" placeholder="Value" required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="phone">Phone number</label>
            <input type="tel" id="phone" name="phone" className="Input" placeholder="Value" required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" className="Input" placeholder="Value" required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="address">Shipping address</label>
            <textarea id="address" name="address" className="Textarea" placeholder="Value" rows={3} required></textarea>
          </div>
        </section>

        <section className="checkout-section">
          <h2 className="checkout-section__title">Payment Method</h2>
          <div className="payment-options">
            <label className="radio-option">
              <input type="radio" name="payment_method" value="debit" defaultChecked />
              <span className="radio-custom"></span>
              <span className="radio-label">Debit Card</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="payment_method" value="wallet" />
              <span className="radio-custom"></span>
              <span className="radio-label">Digital Wallet</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="payment_method" value="cod" />
              <span className="radio-custom"></span>
              <span className="radio-label">Cash On Delivery</span>
            </label>
          </div>
        </section>

        <section className="checkout-summary">
          <h2 className="checkout-section__title">Order Summary</h2>
          <div className="summary-details">
            <div className="summary-total">
              <p>Total</p>
              <p>{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(cartItems.reduce(
                (acc, it) => acc + getProductById(products, it.id)!.price.value * it.amount, 0)
              )}</p>
            </div>
            <PendingButton
              type="submit"
              className="button button--primary button--pay"
              name="process-payment"
              value="true"
            >Pay</PendingButton>
          </div>
        </section>
      </div>
    </div>
  </main>;
}

interface CheckoutProps {
  cartItems: CartItem[],
  products: Product[],
}

enum CheckoutStep {
  CART = 1,
  CHECKOUT = 2,
}

export default function Checkout({
  cartItems = [],
  products = [],
}: CheckoutProps) {
  const [currentStep, setCurrentStep] = useState(CheckoutStep.CART);

  return <ProductsContext.Provider value={{ cartItems, products }}>
    {currentStep === CheckoutStep.CART
      ? <CartForm submitAction={() => setCurrentStep(CheckoutStep.CHECKOUT)} />
      : <CheckoutForm />}
  </ProductsContext.Provider>;
}
