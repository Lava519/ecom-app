import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import "./Login.css";

export default function Login() {
  const location = useLocation();
  const [registeredMessage, setRegisteredMessage] = useState(location.state?.registered);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(true);
  const nav = useNavigate();

  useEffect(()=>{
    if(registeredMessage)
      setTimeout(() => {
        setRegisteredMessage(false);
      }, 3000);
  },[])
  async function submitToDB() {
    const res = await fetch("http://localhost:3000/user/login", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      username: username,
      password: password,
      })
    })
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("authToken", data.accessToken);
      nav("/");
    }
    else if (res.status === 202) {
      setValidLogin(false);
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setValidLogin(true);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidLogin(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    submitToDB();
  }
  const register = () => {
    nav("/register");
  }

  return (
    <div>
      <Nav></Nav>
      <div className="login-form-container">
        
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-form-title">LOGIN</h2>
          {registeredMessage && <p className="login-created-account">Successfully created account</p>}
          {!validLogin && <p className="warning">We couldn't find this account</p>}
          <p className="username">Username:</p>
          <input className="username-input" onChange={handleUsernameChange} type="text"/>
          <p className="password">Password:</p>
          <input type="password" className="password-input" onChange={handlePasswordChange}/>
          <button className="login-button" type="submit">Login</button>
          <button className="register-button" type="button" onClick={register}>Click here to register</button>
        </form>
      </div>
    </div>
  )
} 
