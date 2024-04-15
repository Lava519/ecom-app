import { useEffect, useState } from 'react';
import "./CartItems.css";

export default function CartItems() {
  const [products, setProducts] = useState(null);
  async function deleteItem(id) {
    const res = await fetch("http://localhost:3000/cart/deleteCart", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authentication': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        productID: id,
      })
    });
  }

  const handleDelete = (id) => {
    deleteItem(id);
    let temp = products.filter( (product) => product.ProductID!=id );
    setProducts(temp);
  }
  useEffect( ()=> {
    async function getCartItems() {
      const res = await fetch("http://localhost:3000/cart/cartItems", {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authentication': `Bearer ${localStorage.getItem('authToken')}`
        },
      });
      const data = await res.json();
      setProducts(data);
    } 
    getCartItems();
  }, [])
  return (
    <div className="cart-items-container">
      {products &&
        products.map( (product) => {
          return (
            <section className="cart-item" key={product.ProductID}>
              <div className="cart-item-image-container">
                <img className="cart-item-image" src={product.Image} />
              </div>
              <div className="cart-item-text-container">
                <p className="cart-item-name">{product.Name}</p>
                <p className="cart-item-quantity">{`${product.Price*product.Quantity}$`}</p>
              </div>
              <div className="cart-item-delete-container" onClick={()=>{handleDelete(product.ProductID)}}>
                <img className="cart-item-delete" src="./Delete.svg" />
              </div>
            </section>
          )
        })
      }
    </div>
  )
}