import "./FoodDisplay.css";
import { useGlobalContext } from "../../Context/StoreContext";
import FoodItems from "../FoodItems/FoodItems";
// import { item_data } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({ category }) => {
  const { item_list } = useGlobalContext();

  return (
    <div className="food-display" id="food-display">
      <h2>Top Items near you</h2>
      <div className="food-display-list">
        {item_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItems
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
