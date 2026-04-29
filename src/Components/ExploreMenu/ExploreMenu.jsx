import "./ExploreMenu.css";
import { item_list } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our store variaties</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo sint
        cupiditate impedit pariatur et molestiae eum aperiam, repellat
        repudiandae quam.
      </p>
      <div className="explore-menu-list">
        {item_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.item_name ? "All" : item.item_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.item_name ? "active" : ""}
                src={item.item_image}
                alt={item.item_name}
              />
              <p>{item.item_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
