import { useState ,useEffect, useRef } from 'react';

export default function Cart({id, item}) {
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
    if (localStorage.getItem('authToken') && quantity > 0)
      addToCart();
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
    <div>
      <div>
        <button onClick={handleDecrement}>-</button>
        <input ref={number} onChange={handleCartInput} maxLength="2" type="text" />
        <button onClick={handleIncrement}>+</button>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
