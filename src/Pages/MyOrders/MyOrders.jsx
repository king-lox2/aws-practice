import { useEffect, useState } from "react";
import "./MyOrder.css";
import { useGlobalContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token, loading, setLoading } = useGlobalContext();
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="container">
          {data.length < 1 ? (
            <div>No orders placed yet!</div>
          ) : (
            data.map((order, index) => {
              return (
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return `${item.name} X ${item.quantity}`;
                      } else {
                        return ` ${item.name} X ${item.quantity}` + ", ";
                      }
                    })}
                  </p>
                  <p>${order.amount}.00</p>
                  <p> Items: {order.items.length}</p>
                  <p>
                    <span>&#x25cf;</span> <b>{order.status}</b>
                  </p>
                  <button onClick={fetchOrders}>Track order</button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
