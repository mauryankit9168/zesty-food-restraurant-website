import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  

  const {
    food_list,
    cartItems,
    getTotalCartAmount,
    token,
    setCartItems
  } = useContext(StoreContext)

  const location = useLocation()

  const discount = location.state?.discount || 0
  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const grandTotal = Math.max(
      0,
      subtotal + deliveryFee - discount
  )

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  })


  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const handlePlaceOrder = async (e) => {

    e.preventDefault()

    if (!token) {
      alert("Please login before placing an order.")
      return
    }

    setLoading(true)

    try {

      // Create order items
      const orderItems = {}

      for (const item in cartItems) {

        if (cartItems[item] > 0) {
          orderItems[item] = cartItems[item]
        }

      }

      if (Object.keys(orderItems).length === 0) {
        alert("Your cart is empty.")
        setLoading(false)
        return
      }


      const totalAmount = getTotalCartAmount()


     const response = await axios.post(
            "http://127.0.0.1:8000/orders",
            {
                items: orderItems,
                subtotal: subtotal,
                discount: discount,
                delivery_fee: deliveryFee,
                amount: grandTotal
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )


      console.log("ORDER RESPONSE:", response.data)

      alert(
        `Order placed successfully! Order ID: ${response.data.order_id}`
      )

      // Clear cart
      setCartItems({})


    } catch (error) {

      console.error("ORDER ERROR:", error)

      if (error.response) {
        alert(
          error.response.data.detail ||
          "Failed to place order"
        )
      } else {
        alert("Something went wrong.")
      }

    } finally {

      setLoading(false)

    }
  }


  return (

    <form
      className="place-order"
      onSubmit={handlePlaceOrder}
    >

      <div className="place-order-left">

        <p className="title">
          Delivery Information
        </p>

        <div className="multi-fields">

          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

        </div>


        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />


        <div className="multi-fields">

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />

        </div>


        <div className="multi-fields">

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

        </div>

      </div>


      <div className="place-order-right">

        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
            </div>

            <hr />

            <div>
                <p>Delivery Fee</p>
                <p>₹{deliveryFee.toFixed(2)}</p>
            </div>

            <hr />

            {discount > 0 && (
                <>
                    <div>
                        <p>Discount</p>
                        <p>-₹{discount.toFixed(2)}</p>
                    </div>

                    <hr />
                </>
            )}

            <div>
                <b>Total</b>
                <b>₹{grandTotal.toFixed(2)}</b>
            </div>


          <hr />



          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Placing Order..."
              : "PLACE ORDER"
            }

          </button>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder