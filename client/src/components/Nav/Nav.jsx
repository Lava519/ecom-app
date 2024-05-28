import "./Nav.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
export default function Nav() {
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);
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
  const navProfile = () => {
    nav("/profile")
  }
  return (
    <div className="nav-container">
      <ul className="nav">
        <li className="nav-home" onClick={navHome}>Home</li>
        {name && <li>Cart</li>}
        {name ? <li onClick={navProfile}>{name}<span className="nav-avatar-container"><img className="nav-avatar" src={`${avatar}`} /></span></li> : <li className="nav-login" onClick={navLogin}>Login</li> }
      </ul>
    </div>
  )
} 
