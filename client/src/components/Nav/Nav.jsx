import "./Nav.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItems from '../CartItems/CartItems';
export default function Nav({cartProduct}) {
  const [name, setName] = useState(localStorage.getItem('name'));
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
  const [hideCart, setHideCart] = useState(true)
  const [cartFull, setCartFull] = useState(false);
  const nav = useNavigate();
  async function authenticate() {
    const res = await fetch("http://localhost:3000/user/authenticate", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    if (res.status === 200) {
      const data = await res.json().then( (x) => x.data[0]);
      setName(data.FullName);
      setAvatar(data.Avatar);
      localStorage.setItem('name', data.FullName);
      localStorage.setItem('avatar', data.Avatar);
    }
  }
  useEffect(() => {
    if(localStorage.getItem('authToken')) {
      authenticate();
    }
  }, [])
  const cartContent = (value) => {
    setCartFull(value)
  }
  const navLogin = () => {
    nav("/login");
  }
  const navHome = () => {
    nav("/");
  }
  const toggleCart = () => {
    if (hideCart)
      setHideCart(false);
    else
      setHideCart(true);
  }
  const navProfile = () => {
    nav("/profile")
  }
  return (
    <div className="nav-container">
      <ul className="nav">
        <li className="nav-home" onClick={navHome}>Home</li>
        {name && <li className="cart" onClick={toggleCart}><div className={`cart-image-container ${cartFull ? "cart-full" : ""}`}><img src="/Cart.svg"></img></div></li>}
        {name ? <li className="nav-profile-button" onClick={navProfile}>{name}<span className="nav-avatar-container"><img className="nav-avatar" src={`${avatar}`} /></span></li> : <li className="nav-login" onClick={navLogin}>Login</li> }
        <div className={`dropdown-cart ${hideCart===true ? "hide" : ""}`}>
          <CartItems cartContent={cartContent} cartProduct={cartProduct}></CartItems>
        </div>
      </ul>
      <div onClick={toggleCart} className={`overlay ${hideCart===true ? "hide" : ""}`}></div>
    </div>
  )
} 
