import { useState , useRef } from 'react';
import "./Cart.css"

export default function Cart({updateCartProduct, id, item}) {
  const [quantity, setQuantity] = useState(0);
  const number = useRef(null);
  async function addToCart() {
    fetch('http://localhost:3000/cart/cart', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authentication': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({
        userID: id,
        productID: item.ProductID,
        quantity: quantity,
      })
    })
  }
  const handleAddToCart = () => {
    number.current.value = 0;
    setQuantity(0);
    if (localStorage.getItem('authToken') && quantity > 0) {
      addToCart();
      updateCartProduct(quantity);
    }
      
  }
  const handleCartInput = (e) => {
    if (e.target.value == null)
      e.target.value = 0;
    e.target.value = e.target.value.replace(/\D/g,'');
    setQuantity(Number(e.target.value));
  }
  const handleIncrement = () => {
    if (number.current.value < 99 ) {
      setQuantity(quantity+1);
      number.current.value = quantity + 1;
    }
  }
  const handleDecrement = () => {
    if (number.current.value > 0 ) {
      setQuantity(quantity-1);
      number.current.value = quantity - 1;
    }
  }
  return (
    <div className="cart-container">
      <div className="cart-buttons-container">
        <button className="cart-decrease" onClick={handleDecrement}>-</button>
        <input className="cart-input" ref={number} onChange={handleCartInput} maxLength="2" type="text" />
        <button className="cart-increase" onClick={handleIncrement}>+</button>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
