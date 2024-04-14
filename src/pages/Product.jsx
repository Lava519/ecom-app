import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from "../components/Nav/Nav";
import Cart from "../components/Cart/Cart";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [userID, setUserID] = useState(null);
  const location = useLocation();
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
  return(
    <>
      <Nav></Nav>
      { product && <div>
        <div>
          <img src={product.Image} />
        </div>
        <h1>{product.Name}</h1>
        <h2>{product.Price}</h2>
        <Cart item={product} id={userID}></Cart>
      </div> }
    </>
  )
}
