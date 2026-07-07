// components/FoodCard.jsx
function FoodCard({ item, addToCart }) {
  return (
    <div style={{border:"1px solid #ddd", padding:"10px", borderRadius:"10px", width:"200px"}}>
      <img src={item.image} alt={item.name} width="100%" />
      <h3>{item.name}</h3>
      <p>₹ {item.price}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
}

export default FoodCard;