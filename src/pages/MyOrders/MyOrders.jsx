import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const MyOrders = () => {

    const { token, food_list } = useContext(StoreContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchOrders = async () => {

            if (!token) {
                setError("Please login to see your orders.");
                setLoading(false);
                return;
            }

            try {

                const response = await axios.get(
                    "http://127.0.0.1:8000/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("MY ORDERS:", response.data);

                setOrders(response.data);

            } catch (error) {

                console.error("ORDER FETCH ERROR:", error);

                setError(
                    error.response?.data?.detail ||
                    "Failed to load orders."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, [token]);


    if (loading) {
        return (
            <div className="my-orders">
                <h2>My Orders</h2>
                <p>Loading orders...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="my-orders">
                <h2>My Orders</h2>
                <p className="order-error">{error}</p>
            </div>
        );
    }


    return (

        <div className="my-orders">

            <h2>My Orders</h2>

            {orders.length === 0 ? (

                <p className="no-orders">
                    You have not placed any orders yet.
                </p>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.id}
                        >

                            {/* Header */}

                            <div className="order-header">

                                <div>
                                    <h3>
                                        Order #{order.id}
                                    </h3>

                                    <p>
                                        Order Status
                                    </p>
                                </div>

                                <span className="order-status">
                                    {order.status}
                                </span>

                            </div>


                            <div className="order-tracking">

                                {[
                                    "Pending",
                                    "Confirmed",
                                    "Preparing",
                                    "Out for Delivery",
                                    "Delivered"
                                ].map((status, index) => {

                                    const statuses = [
                                        "Pending",
                                        "Confirmed",
                                        "Preparing",
                                        "Out for Delivery",
                                        "Delivered"
                                    ];

                                    const currentIndex = statuses.indexOf(order.status);

                                    return (
                                        <div
                                            key={status}
                                            className={`tracking-step ${
                                                index <= currentIndex ? "completed" : ""
                                            } ${
                                                index === currentIndex ? "current" : ""
                                            }`}
                                        >

                                            <div className="tracking-dot">
                                                {index < currentIndex ? "✓" : index + 1}
                                            </div>

                                            <span>{status}</span>

                                        </div>
                                    );
                                })}

                            </div>


                            {/* Items */}

                            <div className="order-items">

                                {Object.entries(order.items).map(
                                    ([foodId, quantity]) => {

                                        const food = food_list.find(
                                            (item) =>
                                                String(item._id) ===
                                                String(foodId)
                                        );

                                        return (

                                            <div
                                                className="order-item"
                                                key={foodId}
                                            >

                                                {food && (
                                                    <img
                                                        src={food.image}
                                                        alt={food.name}
                                                    />
                                                )}

                                                <div className="order-item-info">

                                                    <p>
                                                        {food
                                                            ? food.name
                                                            : `Food #${foodId}`}
                                                    </p>

                                                    <span>
                                                        Quantity: {quantity}
                                                    </span>

                                                </div>

                                                {food && (
                                                    <strong>
                                                        ₹
                                                        {(
                                                            food.price *
                                                            quantity
                                                        ).toFixed(2)}
                                                    </strong>
                                                )}

                                            </div>

                                        );

                                    }
                                )}

                            </div>


                            {/* Price Summary */}

                            <div className="order-summary">

                                <div>
                                    <span>Subtotal</span>
                                    <span>
                                        ₹{order.subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div>
                                    <span>Delivery Fee</span>
                                    <span>
                                        ₹{order.delivery_fee.toFixed(2)}
                                    </span>
                                </div>

                                {order.discount > 0 && (

                                    <div className="discount-row">
                                        <span>Discount</span>
                                        <span>
                                            -₹{order.discount.toFixed(2)}
                                        </span>
                                    </div>

                                )}

                                <hr />

                                <div className="final-total">
                                    <strong>Total Paid</strong>

                                    <strong>
                                        ₹{order.amount.toFixed(2)}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default MyOrders;