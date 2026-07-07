// pages/Menu.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../components/FoodCard";

function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/menu/")
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (item) => {
    console.log("Added:", item);
  };

  return (
    <div style={{display:"flex", gap:"20px", flexWrap:"wrap"}}>
      {items.map(item => (
        <FoodCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default Menu;