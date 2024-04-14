import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav/Nav';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const nav = useNavigate();
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
  }
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = () => {
    submitToDB();
  }

  return (
    <div>
      <Nav></Nav>
      <input onChange={handleUsernameChange} type="text"/>
      <input onChange={handlePasswordChange} type="text"/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
} 
