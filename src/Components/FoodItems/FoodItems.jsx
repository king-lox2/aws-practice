import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useGlobalContext } from "../../Context/StoreContext";

// eslint-disable-next-line react/prop-types
const FoodItems = ({ id, name, price, description, image }) => {
  const { cartItems, url, addToCart, removeFromCart } = useGlobalContext();

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={`${url}/images/${image}`}
          alt=""
          className="food-item-image"
        />

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt={name} />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">
          $ <span>{price}</span>
        </p>
      </div>
    </div>
  );
};

export default FoodItems;
