import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from "../../components/Nav/Nav";
import Cart from "../../components/Cart/Cart";
import "./Product.css";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [userID, setUserID] = useState(null);
  const [cartProduct, setCartProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const location = useLocation();
  const currency = '$';
  useEffect(() => {

  async function getUserID() {
      const res = await fetch("http://localhost:3000/user/getUserID", {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authentication': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if ( res.status == 200 ) {
          let data = await res.json();
          setUserID(data.id);
       }
    }
  async function fetchProduct() {
    let id = location.pathname.split("/");
    id = id[id.length-1];
    const res = await fetch("http://localhost:3000/product/product?id="+id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    });
    let data = await res.json();
    setProduct(data.data[0]);
  }
    if (location.state == null)
      fetchProduct();
    else
      setProduct(location.state.product);
    if ( localStorage.getItem('authToken') ) {
      getUserID();
    }
  }, [])
  const updateCartProduct = (q) => {
    setCartProduct({ ProductID: product.ProductID, Name: product.Name, Quantity: quantity+q, Image: product.Image, Price: product.Price});
  }
  return(
    <>
      <Nav cartProduct={cartProduct}></Nav>
      { product && <div className="product-page-container">
        <div className="product-page">
          <div className="product-image-container">
            <img className="product-image" src={product.Image} />
          </div>
          <div className="product-text-container">
            <h1 className="product-name">{product.Name}</h1>
            <p className="product-description">{product.Description}</p>
            <h2 className='product-price'>{product.Price}{currency}</h2>
            <Cart updateCartProduct={updateCartProduct} item={product} id={userID}></Cart>
          </div>
        </div>

      </div> }
    </>
  )
}
