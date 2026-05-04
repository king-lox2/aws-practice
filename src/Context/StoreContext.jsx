import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const StoreContext = React.createContext();
// eslint-disable-next-line react/prop-types
const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [item_list, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  // const url = "https://store-deliver-backend.onrender.com";

console.log("env:", import.meta.env);
console.log("VITE_NODE_ENV:", import.meta.env.VITE_NODE_ENV);
console.log("VITE_SERVER_BASE_URL:", import.meta.env.VITE_SERVER_BASE_URL);

const url =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_BASE_URL
    : import.meta.env.VITE_SERVER_BASE_URL;

  const fetchItemList = async () => {
    const response = await axios.get(`${url}/api/store/list`);
    if (response.data.success) {
      setItemList(response.data.data);
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = item_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/cartdata`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  const shippingFee = () => {
    let shippingAmount = 0;
    let cartItemss;
    for (const item in cartItems) {
      shippingAmount = 3;
      cartItemss = cartItems[item];
      console.log(cartItemss);
    }
    return shippingAmount, cartItemss;
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const loadData = async () => {
      await fetchItemList();
      await fetchCartData(localStorage.getItem("token"));
    };
    loadData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        item_list,
        setItemList,
        cartItems,
        setCartItems,
        addToCart,
        getTotalCartAmount,
        removeFromCart,
        shippingFee,
        url,
        token,
        setToken,
        loading,
        setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(StoreContext);
};

export { StoreContext, StoreContextProvider };
