import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";


const Cart = () => {

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const applyPromoCode = () => {
      const code = promoCode.trim().toUpperCase();

      if (subtotal === 0) {
          setPromoMessage("Add items to cart first.");
          setDiscount(0);
          return;
      }

      if (code === "ZESTY10") {
          setDiscount(subtotal * 0.10);
          setPromoMessage("10% discount applied!");
      } 
      else if (code === "WELCOME50") {
          const discountAmount = Math.min(50, subtotal);
          setDiscount(discountAmount);
          setPromoMessage("₹50 discount applied!");
      } 
      else if (code === "SAVE20") {
          setDiscount(subtotal * 0.20);
          setPromoMessage("20% discount applied!");
      } 
      else {
          setDiscount(0);
          setPromoMessage("Invalid promo code.");
      }
  };

    const navigate = useNavigate();

  const {
    cartItems,
    food_list,
    removeFromCart,
    updateCartQuantity,
    getTotalCartAmount
} = useContext(StoreContext);

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const grandTotal =
    subtotal === 0
        ? 0
        : Math.max(0, subtotal + deliveryFee - discount);

  return (
    <div className="cart">
      {/* Table Header */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {/* Items List */}
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p className="item-title">{item.name}</p>
                  <p>${item.price}</p>
                  <div className="quantity-control">
                  <button
                      onClick={() =>
                          updateCartQuantity(
                              item._id,
                              cartItems[item._id] - 1
                          )
                      }
                  >
                      −
                  </button>

                  <span>{cartItems[item._id]}</span>

                  <button
                      onClick={() =>
                          updateCartQuantity(
                              item._id,
                              cartItems[item._id] + 1
                          )
                      }
                  >
                      +
                  </button>
              </div>
                  <p className="item-total">
                      ₹{item.price * cartItems[item._id]}
                  </p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cross"
                  >
                    ×
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Bottom Section */}
      <div className="cart-bottom">
        {/* Cart Totals Box */}
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{subtotal}</p>
      </div>

      <hr />

      <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹{deliveryFee}</p>
      </div>

      <hr />

      {discount > 0 && (
          <>
              <div className="cart-total-details">
                  <p>Discount</p>
                  <p>-₹{discount.toFixed(2)}</p>
              </div>
              <hr />
          </>
      )}

      <div className="cart-total-details grand-total">
          <b>Total</b>
          <b>₹{grandTotal.toFixed(2)}</b>
      </div>

          <button
              onClick={() =>
                  navigate("/order", {
                      state: {
                          discount: discount,
                          subtotal: subtotal,
                          deliveryFee: deliveryFee
                      }
                  })
              }
          >
              PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Box */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
              <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
              />

              <button onClick={applyPromoCode}>
                  Apply
              </button>
          </div>

          {promoMessage && (
              <p className="promo-message">
                  {promoMessage}
              </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;