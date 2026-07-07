import React, { useContext } from "react";
import "./Cart.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const{cartItems,food_list,removeFromCart,getTotalCartAmount}=useContext(StoreContext)
  return (
    <div className="cart">
      
      {/* Table Header */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr/>
              </div>
            )
          }
        })}
      </div>
      

      

      <hr />

      {/* Bottom Section */}
      <div className="cart-bottom">
        
        {/* Left */}
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount( )}</b>
            </div>
          </div>

          <button>PROCEED TO CHECKOUT</button>
        </div>

        {/* Right */}
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>

          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;