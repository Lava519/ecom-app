import "./Nav.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItems from '../CartItems/CartItems';
export default function Nav({cartProduct}) {
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [hideCart, setHideCart] = useState(true)
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
    }
  }
  useEffect(() => {
    if(localStorage.getItem('authToken')) {
      authenticate();
    }
  }, [])
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
        {name && <li className="cart" onClick={toggleCart}><img src="/Cart.svg"></img></li>}
        {name ? <li onClick={navProfile}>{name}<span className="nav-avatar-container"><img className="nav-avatar" src={`${avatar}`} /></span></li> : <li className="nav-login" onClick={navLogin}>Login</li> }
        <div className={`dropdown-cart ${hideCart===true ? "hide" : ""}`}>
          <CartItems cartProduct={cartProduct}></CartItems>
        </div>
      </ul>
      <div onClick={toggleCart} className={`overlay ${hideCart===true ? "hide" : ""}`}></div>
    </div>
  )
} 
