import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { foodImages } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [user, setUser] = useState(null);
    // =========================
    // GET FOOD FROM BACKEND
    // =========================

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/foods")
            .then((response) => {

                const foods = response.data.map((item) => {

                    const imageNumber = parseInt(
                        item.image
                            .replace("food_", "")
                            .replace(".png", "")
                    );

                    return {
                        ...item,

                        // Keep old frontend _id format
                        _id: String(item.id),

                        // Convert food_1.png -> actual imported image
                        image: foodImages[imageNumber - 1]
                    };
                });

                setFoodList(foods);

                console.log("FOODS FROM BACKEND:", foods);
            })
            .catch((error) => {
                console.error(
                    "Error fetching foods:",
                    error
                );
            });

    }, []);


    // =========================
    // AUTH
    // =========================

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const fetchUser = async () => {
        const savedToken = localStorage.getItem("token");

        if (!savedToken) {
            setUser(null);
            return;
        }

        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`
                    }
                }
            );

            setUser(response.data);

            console.log("LOGGED IN USER:", response.data);

        } catch (error) {
            console.error("USER FETCH ERROR:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [token]);

    const login = (accessToken) => {

        localStorage.setItem(
            "token",
            accessToken
        );

        setToken(accessToken);
        setIsLoggedIn(true);
    };


    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);
        setIsLoggedIn(false);
        setUser(null); 
    };


    // =========================
    // CART
    // =========================

    const addToCart = (itemId) => {

        if (!cartItems[itemId]) {

            setCartItems((prev) => ({
                ...prev,
                [itemId]: 1
            }));

        } else {

            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1
            }));
        }
    };


    const removeFromCart = (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
    };

    const updateCartQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            setCartItems((prev) => {
                const updated = { ...prev };
                delete updated[itemId];
                return updated;
            });
            return;
        }

        setCartItems((prev) => ({
            ...prev,
            [itemId]: quantity
        }));
    };


    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                const itemInfo = food_list.find(
                    (product) => product._id === String(item)
                );

                if (itemInfo) {

                    totalAmount +=
                        itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };


    const contextValue = {

        // Foods
        food_list,

        // Cart
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getTotalCartAmount,

        // Authentication
        token,
        isLoggedIn,
        user,
        login,
        logout
    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;